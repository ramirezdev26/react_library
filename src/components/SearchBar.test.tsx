import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  it('renderiza el input y el boton de buscar', () => {
    render(<SearchBar query="" onChange={() => {}} onSearch={() => {}} />);

    expect(screen.getByPlaceholderText('Busca un libro...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  it('llama a onSearch al hacer clic en el boton', () => {
    const mockSearch = vi.fn();
    render(<SearchBar query="react" onChange={() => {}} onSearch={mockSearch} />);

    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    expect(mockSearch).toHaveBeenCalledTimes(1);
  });

  it('llama a onSearch al presionar Enter', () => {
    const mockSearch = vi.fn();
    render(<SearchBar query="react" onChange={() => {}} onSearch={mockSearch} />);

    fireEvent.keyDown(screen.getByPlaceholderText('Busca un libro...'), { key: 'Enter' });

    expect(mockSearch).toHaveBeenCalledTimes(1);
  });

  it('no llama a onSearch con otras teclas', () => {
    const mockSearch = vi.fn();
    render(<SearchBar query="react" onChange={() => {}} onSearch={mockSearch} />);

    fireEvent.keyDown(screen.getByPlaceholderText('Busca un libro...'), { key: 'a' });

    expect(mockSearch).not.toHaveBeenCalled();
  });
});
