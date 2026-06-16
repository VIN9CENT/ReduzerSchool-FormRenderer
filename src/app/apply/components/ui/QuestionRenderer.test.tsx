'use client';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest, describe, it, beforeEach } from '@jest/globals';
import '@testing-library/jest-dom';

import { QuestionRenderer } from './QuestionRenderer';
import { Question } from '../../validation/QuestionTypes';

type FormAnswers = Record<string, string | string[] | File | null>;

const mockQuestions: Question[] = [
  { id: 'fullName', type: 'text', label: 'Full Name', validation: { required: true, minLength: 2 } },
  { id: 'motivation', type: 'textarea', label: 'Motivation', validation: { required: true, minLength: 10 } },
  { id: 'edu', type: 'select', label: 'Education', options: [{ label: 'Bachelors', value: 'bachelors' }], validation: { required: true } },
  { id: 'track', type: 'radio', label: 'Track', options: [{ label: 'Fullstack', value: 'fullstack' }], validation: { required: true } },
  { id: 'skills', type: 'checkbox', label: 'Skills', options: [{ label: 'HTML', value: 'html' }, { label: 'CSS', value: 'css' }], validation: { required: true } },
];

describe('QuestionRenderer Requirement Checks', () => {
  const mockSubmit = jest.fn<(a: FormAnswers) => void>();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  // 1-5. Rendering Tests
  it('Requirement 1-5: Renders all question types correctly', () => {
    render(<QuestionRenderer questions={mockQuestions} onSubmit={mockSubmit} allowPasting={true} />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Motivation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Education/i)).toBeInTheDocument();
    expect(screen.getByText(/Track/i)).toBeInTheDocument();
    expect(screen.getByText(/Skills/i)).toBeInTheDocument();
  });

  // 6-10. Blocking Submission Tests
  it('Requirement 6-10: Blocks submission when required fields are empty', () => {
    render(<QuestionRenderer questions={mockQuestions} onSubmit={mockSubmit} allowPasting={true} />);
    const btn = screen.getByRole('button', { name: /submit/i }) as HTMLButtonElement;
    expect(btn).toBeDisabled();
  });

  // 11. Error Display
  it('Requirement 11: Shows error messages for invalid fields', async () => {
    render(<QuestionRenderer questions={mockQuestions} onSubmit={mockSubmit} allowPasting={true} />);
    const input = screen.getByLabelText(/Full Name/i);
    await userEvent.type(input, 'A');
    await userEvent.clear(input);
    expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
  });

  // 12. Enables Submit
  it('Requirement 12: Enables submit when all required fields are valid', async () => {
    render(<QuestionRenderer questions={mockQuestions} onSubmit={mockSubmit} allowPasting={true} />);
    
    await userEvent.type(screen.getByLabelText(/Full Name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/Motivation/i), 'I am very motivated to learn');
    await userEvent.selectOptions(screen.getByLabelText(/Education/i), 'bachelors');
    await userEvent.click(screen.getByLabelText(/Fullstack/i));
    await userEvent.click(screen.getByLabelText(/HTML/i));

    const btn = screen.getByRole('button', { name: /submit/i }) as HTMLButtonElement;
    await waitFor(() => expect(btn).toBeEnabled());
  });

  // 13. Submits strings correctly
  it('Requirement 13: Submits text, textarea, select, and radio as strings', async () => {
    render(<QuestionRenderer questions={mockQuestions} onSubmit={mockSubmit} allowPasting={true} />);
    
    await userEvent.type(screen.getByLabelText(/Full Name/i), 'Lennox');
    await userEvent.type(screen.getByLabelText(/Motivation/i), 'Motivation text here');
    await userEvent.selectOptions(screen.getByLabelText(/Education/i), 'bachelors');
    await userEvent.click(screen.getByLabelText(/Fullstack/i));
    await userEvent.click(screen.getByLabelText(/HTML/i));

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
      fullName: 'Lennox',
      motivation: 'Motivation text here',
      edu: 'bachelors',
      track: 'fullstack'
    }));
  });

  // 14. Submits checkbox as array
  it('Requirement 14: Submits checkbox answers as an array', async () => {
    render(<QuestionRenderer questions={mockQuestions} onSubmit={mockSubmit} allowPasting={true} />);
    
    // Fill requireds to enable button
    await userEvent.type(screen.getByLabelText(/Full Name/i), 'Lennox');
    await userEvent.type(screen.getByLabelText(/Motivation/i), 'Motivation text here');
    await userEvent.selectOptions(screen.getByLabelText(/Education/i), 'bachelors');
    await userEvent.click(screen.getByLabelText(/Fullstack/i));
    
    // Select multiple checkboxes
    await userEvent.click(screen.getByLabelText(/HTML/i));
    await userEvent.click(screen.getByLabelText(/CSS/i));

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
      skills: ['html', 'css'] // Verified as array
    }));
  });

  // 15-16. Blocks Paste
  it('Requirement 15-16: Blocks paste into text fields when allowPasting is false', () => {
    render(<QuestionRenderer questions={mockQuestions} onSubmit={mockSubmit} allowPasting={false} />);
    
    const input = screen.getByLabelText(/Full Name/i);
    const textarea = screen.getByLabelText(/Motivation/i);

    const p1 = fireEvent.paste(input, { clipboardData: { getData: () => 'data' } });
    const p2 = fireEvent.paste(textarea, { clipboardData: { getData: () => 'data' } });

    expect(p1).toBe(false); // preventDefault was called
    expect(p2).toBe(false);
  });

  // 17. Allows Paste
  it('Requirement 17: Allows paste into text fields when allowPasting is true', () => {
    render(<QuestionRenderer questions={mockQuestions} onSubmit={mockSubmit} allowPasting={true} />);
    
    const input = screen.getByLabelText(/Full Name/i);
    const p1 = fireEvent.paste(input, { clipboardData: { getData: () => 'data' } });

    expect(p1).toBe(true); // event allowed
  });
});