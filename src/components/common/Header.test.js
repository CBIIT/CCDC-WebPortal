import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders US government banner text', () => {
	render(<Header />);
	const bannerText = screen.getByText(/An official website of the United States government/i);
	expect(bannerText).toBeInTheDocument();
});

test('contains US flag image', () => {
	render(<Header />);
	const flagImage = screen.getByAltText(/US Flag logo/i);
	expect(flagImage).toBeInTheDocument();
});

test('contains CCDC logo', () => {
	render(<Header />);
	const logoElement = screen.getByAltText(/ccdc logo/i);
	expect(logoElement).toBeInTheDocument();
});

test('CCDC logo links to home page', () => {
	render(<Header />);
	const logoLink = screen.getByRole('link');
	expect(logoLink).toHaveAttribute('href', '/');
});