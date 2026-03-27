function ThemeSwitcher({theme, onToggle}) {
    return (
        <button className="theme-btn" onClick={onToggle}>
            {theme === 'light' ? 'Oscuro' : 'Claro'}
        </button>
    );
}

export default ThemeSwitcher;
