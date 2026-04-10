import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setAuth} from '../store/authSlice';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');
        const res = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error);
            return;
        }

        const payload = JSON.parse(atob(data.token.split('.')[1]));
        dispatch(setAuth({token: data.token, user: {name: payload.name, username: payload.username}}));
        navigate('/');
    };

    return (
        <main style={{maxWidth: '320px', margin: '60px auto', textAlign: 'left'}}>
            <h2>Iniciar sesión</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px'}}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={{padding: '10px', borderRadius: '6px', border: '1px solid var(--border)'}}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{padding: '10px', borderRadius: '6px', border: '1px solid var(--border)'}}
                />
                <button onClick={handleLogin} style={{padding: '10px', borderRadius: '6px', cursor: 'pointer'}}>
                    Entrar
                </button>
                {error && <p style={{color: 'red'}}>{error}</p>}
            </div>
            <p style={{marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                Usuario: admin / Contraseña: 1234
            </p>
        </main>
    );
}

export default LoginPage;
