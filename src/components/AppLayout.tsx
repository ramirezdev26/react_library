import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { RootState } from '../store';
import { logout } from '../store/authSlice';
import { auth } from '../firebase';
import ThemeSwitcher from './ThemeSwitcher';

function AppLayout() {
    const theme = useSelector((state: RootState) => state.theme.value);
    const { email } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className={`app ${theme}`}>
            <header className="app-header">
                <nav style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <Link to="/" style={{ color: 'var(--text)', textDecoration: 'none' }}>Inicio</Link>
                    <Link to="/about" style={{ color: 'var(--text)', textDecoration: 'none' }}>Acerca de</Link>
                    {email && (
                        <>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{email}</span>
                            <button onClick={handleLogout} className="theme-btn">Salir</button>
                        </>
                    )}
                    {!email && (
                        <Link to="/login" style={{ color: 'var(--text)', textDecoration: 'none' }}>Login</Link>
                    )}
                </nav>
                <ThemeSwitcher />
            </header>
            <Outlet />
        </div>
    );
}

export default AppLayout;