import { Link } from 'react-router-dom';
import { Book } from '../types/book';

function BookCard({ book }: { book: Book }) {
  const title = book.title || 'Sin título';
  const author = book.author_name?.[0] || 'Autor desconocido';
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;
  const workId = book.key.replace('/works/', '');

  return (
    <Link to={`/books/${workId}`} style={{ textDecoration: 'none' }}>
      <div className="book-card">
        {coverUrl ? (
          <img src={coverUrl} alt={title} className="book-cover" />
        ) : (
          <div className="book-cover-placeholder">📖</div>
        )}
        <div className="book-info">
          <h3>{title}</h3>
          <p>{author}</p>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
