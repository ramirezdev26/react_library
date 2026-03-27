import {useState, useEffect} from 'react';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import ThemeSwitcher from './components/ThemeSwitcher';
import './App.css';

function App() {
    const [query, setQuery] = useState('');
    const [submittedQuery, setSubmittedQuery] = useState('react');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (!submittedQuery) return;

        setLoading(true);

        fetch(`https://openlibrary.org/search.json?q=${submittedQuery}&limit=8`)
            .then(res => res.json())
            .then(data => {
                setBooks(data.docs);
                setLoading(false);
            });
    }, [submittedQuery]);

    const handleSearch = () => {
        if (query.trim() === '') return;
        setSubmittedQuery(query);
    };

    const handleToggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={`app ${theme}`}>
            <header className="app-header">
                <h1>📚 Book Dashboard</h1>
                <ThemeSwitcher theme={theme} onToggle={handleToggleTheme}/>
            </header>

            <SearchBar
                query={query}
                onChange={setQuery}
                onSearch={handleSearch}
            />

            <main className="book-grid">
                {loading && <p className="status-msg">Cargando libros...</p>}
                {!loading && books.length === 0 && (
                    <p className="status-msg">No se encontraron resultados.</p>
                )}
                {!loading && books.map((book, index) => (
                    <BookCard key={book.key || index} book={book}/>
                ))}
            </main>
        </div>
    );
}

export default App;
