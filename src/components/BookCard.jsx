function BookCard({book}) {
    const title = book.title || 'Sin título';
    const author = book.author_name?.[0] || 'Autor desconocido';
    const coverId = book.cover_i;
    const coverUrl = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : null;

    return (
        <div className="book-card">
            {coverUrl ? (
                <img src={coverUrl} alt={title} className="book-cover"/>
            ) : (
                <div className="book-cover-placeholder">📖</div>
            )}
            <div className="book-info">
                <h3>{title}</h3>
                <p>{author}</p>
            </div>
        </div>
    );
}

export default BookCard;
