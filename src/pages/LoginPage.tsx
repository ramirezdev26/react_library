import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { setAuth } from '../store/authSlice';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            dispatch(setAuth({ uid: result.user.uid, email: result.user.email }));
            navigate('/');
        } catch {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <main style={{ maxWidth: '320px', margin: '60px auto', textAlign: 'left' }}>
            <h2>Iniciar sesión</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}
                />
                <button onClick={handleLogin} style={{ padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>
                    Entrar
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </main>
    );
}

export default LoginPage;