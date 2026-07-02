import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OverlayWindow from './index';
import OverlayText from './OverlayText';

const OVERLAY_LOAD_KEY = 'overlayLoad';

describe('OverlayWindow', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  test('renders the government usage warning dialog when overlay has not been dismissed', () => {
    render(<OverlayWindow />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /warning/i })).toBeInTheDocument();
  });

  test('does not render when overlay was previously dismissed', () => {
    window.sessionStorage.setItem(OVERLAY_LOAD_KEY, 'true');

    render(<OverlayWindow />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders all warning content paragraphs', () => {
    render(<OverlayWindow />);

    OverlayText.content.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  test('renders consent text and list items', () => {
    render(<OverlayWindow />);

    expect(
      screen.getByText(/By using this system, you understand and consent to the following:/i),
    ).toBeInTheDocument();

    OverlayText.list.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test('closes the dialog and persists dismissal in session storage when Continue is clicked', () => {
    render(<OverlayWindow />);

    userEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(window.sessionStorage.getItem(OVERLAY_LOAD_KEY)).toBe('true');
  });

  test('has expected accessibility attributes', () => {
    render(<OverlayWindow />);

    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'government-usage-dialog-title');
    expect(screen.getByRole('heading', { name: /warning/i })).toHaveAttribute(
      'id',
      'government-usage-dialog-title',
    );
  });
});
