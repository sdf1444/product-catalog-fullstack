import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and displays the store name', async () => {
    globalThis.fetch = vi.fn()
      // store name
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ name: 'The Tech Library' }),
      })
      // products
      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve([
            { id: 1, name: 'Test Product', type: 'Books', price: 10, image: '' },
          ]),
      })
      // wishlist
      .mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      }) as unknown as typeof fetch;

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('The Tech Library')).toBeInTheDocument();
    });
  });

  it('renders products after fetch', async () => {
    globalThis.fetch = vi.fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ name: 'Store' }),
      })
      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve([
            { id: 1, name: 'Test Product', type: 'Books', price: 10, image: '' },
          ]),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      }) as unknown as typeof fetch;

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });
  });

  it('adds product to wishlist when button is clicked', async () => {
    globalThis.fetch = vi.fn()
      // store
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ name: 'Store' }),
      })
      // products
      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve([
            { id: 1, name: 'Test Product', type: 'Books', price: 10, image: '' },
          ]),
      })
      // wishlist
      .mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      })
      // POST wishlist
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      }) as unknown as typeof fetch;

    render(<App />);

    const button = await screen.findByText('Add to Wishlist');

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });
});