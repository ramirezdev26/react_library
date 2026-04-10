import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../store/themeSlice';
import ThemeSwitcher from '../components/ThemeSwitcher';

function renderWithStore(initialTheme: 'light' | 'dark') {
  const store = configureStore({
    reducer: { theme: themeReducer },
    preloadedState: { theme: { value: initialTheme } },
  });
  return render(
    <Provider store={store}>
      <ThemeSwitcher />
    </Provider>
  );
}

describe('ThemeSwitcher', () => {
  it('muestra el boton Oscuro cuando el tema es light', () => {
    renderWithStore('light');

    expect(screen.getByRole('button', { name: /oscuro/i })).toBeInTheDocument();
  });

  it('muestra el boton Claro cuando el tema es dark', () => {
    renderWithStore('dark');

    expect(screen.getByRole('button', { name: /claro/i })).toBeInTheDocument();
  });

  it('cambia el texto del boton al hacer clic', () => {
    renderWithStore('light');

    fireEvent.click(screen.getByRole('button', { name: /oscuro/i }));

    expect(screen.getByRole('button', { name: /claro/i })).toBeInTheDocument();
  });
});
