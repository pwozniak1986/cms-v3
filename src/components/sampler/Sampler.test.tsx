import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Sampler from './Sampler';

test('renders sampler, add new test', () => {
    render(<Sampler />);
    const addButton = screen.getByRole('button')
    expect(addButton).toBeInTheDocument()

    const list = screen.getByRole("list")
    expect(list).toBeInTheDocument()

    addButton.click()
    addButton.click()
    addButton.click()

    const { getAllByRole } = within(list)
    const items = getAllByRole("listitem")
    expect(items.length).toBe(3)
});
