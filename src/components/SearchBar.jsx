function SearchBar({query, onChange, onSearch}) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') onSearch();
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={e => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Busca un libro..."
            />
            <button onClick={onSearch}>Buscar</button>
        </div>
    );
}

export default SearchBar;
