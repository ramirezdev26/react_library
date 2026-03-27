import { Link, Outlet } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '../context/ThemeContext';

function AppLayout() {
  const { theme } = useTheme();
  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <nav style={{ display: 'flex', gap: '16px' }}>
          <Link to="/" style={{ color: 'var(--text)', textDecoration: 'none' }}>📚 Inicio</Link>
          <Link to="/about" style={{ color: 'var(--text)', textDecoration: 'none' }}>Acerca de</Link>
        </nav>
        <ThemeSwitcher />
      </header>
      <Outlet />
    </div>
  );
}

export default AppLayout;
