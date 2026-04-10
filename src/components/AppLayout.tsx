import {Link, Outlet, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store';
import ThemeSwitcher from './ThemeSwitcher';
import {logout} from '../store/authSlice';

function AppLayout() {
    const theme = useSelector((state: RootState) => state.theme.value);
    const {user, token} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const fetchProfile = async () => {
        const res = await fetch('http://localhost:3001/api/profile', {
            headers: {Authorization: `Bearer ${token}`},
        });
        const data = await res.json();
        alert(JSON.stringify(data));
    };

    return (
        <div className={`app ${theme}`}>
            <header className="app-header">
                <nav style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                    <Link to="/" style={{color: 'var(--text)', textDecoration: 'none'}}>Inicio</Link>
                    <Link to="/about" style={{color: 'var(--text)', textDecoration: 'none'}}>Acerca de</Link>
                    {user && (
                        <>
              <span style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>
                Hola, {user.name}
              </span>
                            <button onClick={fetchProfile} className="theme-btn">Mi perfil</button>
                            <button onClick={handleLogout} className="theme-btn">Salir</button>
                        </>
                    )}
                    {!user && (
                        <Link to="/login" style={{color: 'var(--text)', textDecoration: 'none'}}>Login</Link>
                    )}
                </nav>
                <ThemeSwitcher/>
            </header>
            <Outlet/>
        </div>
    );
}

export default AppLayout;