import React, { useState, useEffect } from 'react';


export const ThemeContext = React.createContext();

const ThemeContextProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedDarkMode =
            typeof window !== "undefined" ? JSON.parse(localStorage.getItem("darkMode")) : null
        if (storedDarkMode) {
            setIsDarkMode(true);
        }
    }, [])

    const toggleThemeMode = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
        }
        setIsDarkMode((current) => (!current));
    }

    return (
        <ThemeContext.Provider value={[isDarkMode, toggleThemeMode]}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;