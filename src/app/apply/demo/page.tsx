'use client';

import React from 'react';
import { QuestionRenderer } from '../components/ui/QuestionRenderer';
import { Question } from '../validation/QuestionTypes';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const demoQuestions: Question[] = [
  {
    id: 'fullName',
    type: 'text',
    label: 'Full Name',
    placeholder: 'e.g. Jane Mwangi',
    validation: { required: true, minLength: 2 },
  },
  {
    id: 'motivation',
    type: 'textarea',
    label: 'Why do you want to join Reduzer School?',
    placeholder: 'Tell us what drives you to pursue software engineering...',
    validation: { required: true, minLength: 10 },
  },
  {
    id: 'educationLevel',
    type: 'select',
    label: 'Highest Education Level',
    options: [
      { label: 'High School', value: 'high_school' },
      { label: 'Undergraduate', value: 'undergraduate' },
      { label: 'Post-Graduate', value: 'graduate' },
      { label: 'Self-Taught', value: 'self_taught' },
    ],
    validation: { required: true },
  },
  {
    id: 'preferredTrack',
    type: 'radio',
    label: 'Preferred Track',
    options: [
      { label: 'Frontend', value: 'frontend' },
      { label: 'Backend', value: 'backend' },
      { label: 'Fullstack', value: 'fullstack' },
    ],
    validation: { required: true },
  },
  {
    id: 'skills',
    type: 'checkbox',
    label: 'Skills you already have',
    options: [
      { label: 'HTML', value: 'html' },
      { label: 'CSS', value: 'css' },
      { label: 'JavaScript', value: 'javascript' },
      { label: 'TypeScript', value: 'typescript' },
    ],
    validation: { required: true },
  },
];

export default function RendererDemoPage() {
  const handleSubmission = (data: Record<string, string | string[]>) => {
    console.log('Assignment Data Output:', data);
    alert('Form Submitted Successfully! Data is in the console.');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Fill the Form to Start Your Application</h1>
            <p className="text-gray-600 mt-2">
              This is my demonstration of the dynamic form rendering component.
            </p>
          </div>

          <QuestionRenderer
            questions={demoQuestions}
            onSubmit={handleSubmission}
            allowPasting={false}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}