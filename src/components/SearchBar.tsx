interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

function SearchBar({ query, onChange, onSearch }: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
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
