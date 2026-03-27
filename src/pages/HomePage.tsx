import { useState } from 'react';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import useFetch from '../hooks/useFetch';
import { SearchResult } from '../types/book';

function HomePage() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('react');
  const { data, isLoading, error } = useFetch<SearchResult>(
    `https://openlibrary.org/search.json?q=${submittedQuery}&limit=8`
  );

  const handleSearch = () => {
    if (query.trim() === '') return;
    setSubmittedQuery(query);
  };

  return (
    <main>
      <SearchBar query={query} onChange={setQuery} onSearch={handleSearch} />
      <div className="book-grid">
        {isLoading && <p className="status-msg">Cargando libros...</p>}
        {error && <p className="status-msg">{error}</p>}
        {!isLoading && !error && data?.docs.length === 0 && (
          <p className="status-msg">No se encontraron resultados.</p>
        )}
        {!isLoading && data?.docs.map((book, i) => (
          <BookCard key={book.key || i} book={book} />
        ))}
      </div>
    </main>
  );
}

export default HomePage;
