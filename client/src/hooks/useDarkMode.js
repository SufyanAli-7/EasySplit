import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

export default useDarkMode;
