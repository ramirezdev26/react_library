import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/themeSlice';

function ThemeSwitcher() {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();
  return (
      <button className="theme-btn" onClick={() => dispatch(toggleTheme())}>
        {theme === 'light' ? 'Oscuro' : 'Claro'}
      </button>
  );
}

export default ThemeSwitcher;