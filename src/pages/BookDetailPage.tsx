import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { WorkDetail } from '../types/book';

function BookDetailPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const { data, isLoading, error } = useFetch<WorkDetail>(
    `https://openlibrary.org/works/${bookId}.json`
  );

  const description =
    typeof data?.description === 'object'
      ? data.description.value
      : data?.description;

  const coverUrl = data?.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
    : null;

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
        </div>
      )}
    </main>
  );
}

export default BookDetailPage;
