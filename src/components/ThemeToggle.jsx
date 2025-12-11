import React, { useEffect, useState } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
const ThemeToggle = () => {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme)
    }
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light'
        setTheme(storedTheme)
        document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }, [])

    return (
        <div>
            <button onClick={toggleTheme} className='rounded-full p-2  cursor-pointer text-gray-600 dark:text-white'>{theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}</button>
        </div>
    )
}

export default ThemeToggle