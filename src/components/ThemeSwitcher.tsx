import { useTheme } from '../context/ThemeContext';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="theme-btn" onClick={toggleTheme}>
      {theme === 'light' ? 'Oscuro' : 'Claro'}
    </button>
  );
}

export default ThemeSwitcher;
