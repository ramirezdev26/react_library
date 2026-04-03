import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ThemeSwitcher from './ThemeSwitcher';

function AppLayout() {
    const theme = useSelector((state: RootState) => state.theme.value);
    return (
        <div className={`app ${theme}`}>
            <header className="app-header">
                <nav style={{ display: 'flex', gap: '16px' }}>
                    <Link to="/" style={{ color: 'var(--text)', textDecoration: 'none' }}>Inicio</Link>
                    <Link to="/about" style={{ color: 'var(--text)', textDecoration: 'none' }}>Acerca de</Link>
                </nav>
                <ThemeSwitcher />
            </header>
            <Outlet />
        </div>
    );
}

export default AppLayout;