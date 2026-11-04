import test from "node:test"
import assert from "node:assert/strict"
import { loadContributions, validateSnapshot } from "./github-contributions.ts"

const now = Date.parse("2026-11-04T12:00:00Z")
const secret = "test-credential-never-publish"
const days = Array.from({ length: 14 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 9, 22 + i))
  return {
    date: date.toISOString().slice(0, 10),
    weekday: date.getUTCDay(),
    contributionCount: i % 2,
    contributionLevel: i % 2 ? "FIRST_QUARTILE" : "NONE",
  }
})
const snapshot = (fetchedAt = new Date(now).toISOString()) => ({
  fetchedAt,
  days,
  totalContributions: 7,
})
const payload = () => ({
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 7,
          weeks: [
            { contributionDays: days.slice(0, 7) },
            { contributionDays: days.slice(7) },
          ],
        },
      },
    },
  },
})
function options(overrides = {}) {
  const warnings = [],
    writes = []
  return {
    login: "praneeth-rdy",
    token: secret,
    now,
    cache: {
      get: async () => undefined,
      set: async (key, value) => {
        writes.push({ key, value })
      },
    },
    warn: message => warnings.push(message),
    warnings,
    writes,
    fetcher: async () => new Response(JSON.stringify(payload())),
    ...overrides,
  }
}

test("fetches authenticated aggregate data and caches only the public allowlist", async () => {
  const o = options({
    fetcher: async (url, init) => {
      assert.equal(url, "https://api.github.com/graphql")
      assert.equal(init.headers.Authorization, `Bearer ${secret}`)
      assert.deepEqual(JSON.parse(init.body).variables, {
        login: "praneeth-rdy",
      })
      assert.ok(init.signal instanceof AbortSignal)
      const p = payload()
      p.data.user.contributionsCollection.contributionCalendar.token = secret
      p.data.user.contributionsCollection.contributionCalendar.weeks[0].contributionDays =
        days.slice(0, 7).map(d => ({ ...d, privateRepo: secret }))
      return new Response(JSON.stringify(p))
    },
  })
  const result = await loadContributions(o)
  assert.deepEqual(result, snapshot())
  assert.equal(o.writes.length, 1)
  assert.equal(
    JSON.stringify({ result, writes: o.writes, warnings: o.warnings }).includes(
      secret
    ),
    false
  )
})
test("fresh validated cache avoids the API, including without credentials", async () => {
  const o = options({
    token: undefined,
    cache: { get: async () => snapshot(), set: async () => assert.fail() },
    fetcher: async () => assert.fail(),
  })
  assert.deepEqual(await loadContributions(o), snapshot())
})
test("expired cache refreshes", async () => {
  const o = options()
  o.cache.get = async () => snapshot("2026-11-01T00:00:00Z")
  assert.equal(
    (await loadContributions(o)).fetchedAt,
    new Date(now).toISOString()
  )
  assert.equal(o.writes.length, 1)
})
test("missing PAT and no cache omits the calendar without fetching", async () => {
  const o = options({ token: undefined, fetcher: async () => assert.fail() })
  assert.equal(await loadContributions(o), null)
})
for (const [name, fetcher] of [
  ["HTTP error", async () => new Response(secret, { status: 401 })],
  [
    "GraphQL HTTP-200 error",
    async () =>
      new Response(
        JSON.stringify({ ...payload(), errors: [{ message: secret }] })
      ),
  ],
  [
    "network failure",
    async () => {
      throw new Error(secret)
    },
  ],
  ["invalid JSON", async () => new Response("not json")],
  [
    "missing user",
    async () => new Response(JSON.stringify({ data: { user: null } })),
  ],
]) {
  test(`${name} keeps the prior snapshot and never logs upstream details`, async () => {
    const prior = snapshot("2026-11-01T00:00:00Z")
    const o = options({ fetcher })
    o.cache.get = async () => prior
    assert.deepEqual(await loadContributions(o), prior)
    assert.equal(o.writes.length, 0)
    assert.equal(JSON.stringify(o.warnings).includes(secret), false)
    o.cache.get = async () => undefined
    assert.equal(await loadContributions(o), null)
  })
}
test("cache read/write failures do not discard a successful fetch", async () => {
  const o = options({
    cache: {
      get: async () => {
        throw new Error()
      },
      set: async () => {
        throw new Error()
      },
    },
  })
  assert.deepEqual(await loadContributions(o), snapshot())
})
test("malformed dates, gaps, counts, levels and cached future timestamps are rejected", async () => {
  for (const edit of [
    d => (d.date = "2026-02-30"),
    d => (d.weekday = 8),
    d => (d.contributionCount = -1),
    d => (d.contributionCount = 1.5),
    d => (d.contributionLevel = "UNKNOWN"),
  ]) {
    const value = structuredClone(snapshot())
    edit(value.days[0])
    assert.equal(validateSnapshot(value), null)
  }
  const duplicate = structuredClone(snapshot())
  duplicate.days[1] = duplicate.days[0]
  assert.equal(validateSnapshot(duplicate), null)
  assert.equal(validateSnapshot({ ...snapshot(), days: [] }), null)
  const o = options({ token: undefined })
  o.cache.get = async () => snapshot("2099-01-01T00:00:00Z")
  assert.equal(await loadContributions(o), null)
})
test("a genuine zero-contribution calendar is valid", () => {
  assert.ok(
    validateSnapshot({
      ...snapshot(),
      totalContributions: 0,
      days: days.map(d => ({
        ...d,
        contributionCount: 0,
        contributionLevel: "NONE",
      })),
    })
  )
})
