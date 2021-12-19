import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
    render(<App />);
    const header = screen.getByText(/this is zustart/i);
    expect(header).toBeInTheDocument();

    const button = screen.getByRole('button')
    console.log(button)
});
