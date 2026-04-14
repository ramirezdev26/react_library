import { useSelector } from 'react-redux';
import { RootState } from '../store';
import useLoans from '../hooks/useLoans';

function LoansPage() {
    const { uid } = useSelector((state: RootState) => state.auth);
    const { loans, returnBook } = useLoans(uid);

    return (
        <main style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
            <h2 style={{ marginBottom: '20px' }}>Mis préstamos</h2>
            {loans.length === 0 && (
                <p style={{ color: 'var(--text-muted)' }}>No tienes libros prestados.</p>
            )}
            {loans.map(loan => (
                <div
                    key={loan.bookId}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        marginBottom: '8px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-card)',
                    }}
                >
                    <div>
                        <p style={{ fontWeight: 500 }}>{loan.title}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Prestado: {new Date(loan.borrowedAt).toLocaleDateString()}
                        </p>
                    </div>
                    <button className="theme-btn" onClick={() => returnBook(loan.bookId)}>
                        Devolver
                    </button>
                </div>
            ))}
        </main>
    );
}

export default LoansPage;