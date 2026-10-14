import { useState, useEffect } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

export default function Header() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <header className="bg-white dark:bg-zinc-800 border-b dark:border-zinc-700 p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold dark:text-white">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600"
        >
          {darkMode ? (
            <HiSun className="w-5 h-5 text-yellow-400" />
          ) : (
            <HiMoon className="w-5 h-5 text-gray-600" />
          )}
        </button>
        <div className="w-8 h-8 bg-gray-300 dark:bg-zinc-600 rounded-full"></div>
      </div>
    </header>
  );
}