import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const SECRET = 'libro_secreto_123';

const USER = {
  username: 'admin',
  password: '1234',
  name: 'Santiago',
};

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== USER.username || password !== USER.password) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ username, name: USER.name }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/api/profile', (req, res) => {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ error: 'Token requerido' });

  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ error: 'Token invalido' });
  }
});

app.listen(3001, () => console.log('Server corriendo en http://localhost:3001'));
