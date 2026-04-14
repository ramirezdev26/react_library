import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import LoginPage from './pages/LoginPage';
import LoansPage from './pages/LoansPage';

const AboutPage = lazy(() => import('./pages/AboutPage'));

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="books/:bookId" element={<BookDetailPage />} />
                <Route path="loans" element={<LoansPage />} />
                <Route
                    path="about"
                    element={
                        <Suspense fallback={<p className="status-msg">Cargando...</p>}>
                            <AboutPage />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;