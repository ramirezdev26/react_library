import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import useLoans from '../hooks/useLoans';
import { WorkDetail } from '../types/book';
import { RootState } from '../store';

function BookDetailPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const { uid } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetch<WorkDetail>(
      `https://openlibrary.org/works/${bookId}.json`
  );
  const { borrow, returnBook, isBorrowed } = useLoans(uid);

  const description =
      typeof data?.description === 'object'
          ? data.description.value
          : data?.description;

  const coverUrl = data?.covers?.[0]
      ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
      : null;

  const borrowed = bookId ? isBorrowed(bookId) : false;

  const handleLoan = async () => {
    if (!uid) {
      navigate('/login');
      return;
    }
    if (!bookId || !data?.title) return;
    if (borrowed) {
      await returnBook(bookId);
    } else {
      await borrow(bookId, data.title);
    }
  };

  return (
      <main style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
          ← Volver
        </Link>
        {isLoading && <p className="status-msg">Cargando...</p>}
        {error && <p className="status-msg">{error}</p>}
        {data && (
            <div style={{ marginTop: '16px' }}>
              {coverUrl && (
                  <img
                      src={coverUrl}
                      alt={data.title}
                      style={{ width: '150px', borderRadius: '8px', marginBottom: '16px' }}
                  />
              )}
              <h2>{data.title}</h2>
              {description && (
                  <p style={{ marginTop: '12px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    {description}
                  </p>
              )}
              <button
                  onClick={handleLoan}
                  className="theme-btn"
                  style={{ marginTop: '20px' }}
              >
                {borrowed ? 'Devolver libro' : 'Prestar libro'}
              </button>
            </div>
        )}
      </main>
  );
}

export default BookDetailPage;