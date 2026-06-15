'use client';

import React from 'react';
import { QuestionRenderer } from '../components/ui/QuestionRenderer';
import { Question } from '../validation/QuestionTypes';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Reusable regex patterns
const PATTERNS = {
  // Kenyan phone: 07XXXXXXXX, 01XXXXXXXX, +2547XXXXXXXX, 2547XXXXXXXX
  kenyanPhone: '^(\\+?254|0)(7[0-9]{8}|1[0-9]{8})$',
  email: '^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$',
  url: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z]{2,6}(\\/[-a-zA-Z0-9()@:%_+.~#?&/=]*)?$',
  gpa: '^(4(\\.0+)?|[0-3](\\.[0-9]+)?)$', // 0.0 to 4.0
  fullName: '^[a-zA-Z]+([ \\-][a-zA-Z]+)+$', // at least two words
};

const demoQuestions: Question[] = [
  // Personal Information
  {
    id: 'fullName',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Jane Doe',
    validation: {
      required: true,
      minLength: 2,
      pattern: PATTERNS.fullName,
      patternMessage: 'Enter your first and last name',
    },
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'jane@example.com',
    validation: {
      required: true,
      pattern: PATTERNS.email,
      patternMessage: 'Enter a valid email address',
    },
  },
  {
    id: 'phone',
    type: 'tel',
    label: 'Phone Number',
    placeholder: 'Type your phone number',
    validation: {
      required: true,
      pattern: PATTERNS.kenyanPhone,
      patternMessage: 'Enter a valid Kenyan phone number e.g. 0712345678',
    },
  },

  // Academic Background
  {
    id: 'educationLevel',
    type: 'select',
    label: 'Highest Level of Education Completed',
    validation: { required: true },
    options: [
      { label: 'High School / KCSE', value: 'highschool' },
      { label: 'Diploma', value: 'diploma' },
      { label: "Bachelor's Degree", value: 'bachelors' },
      { label: "Master's Degree or Higher", value: 'masters' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    id: 'preferredTrack',
    type: 'radio',
    label: 'Preferred Track',
    hint: 'Select the track you want to enrol in.',
    validation: { required: true },
    options: [
      { label: 'Frontend Development', value: 'frontend' },
      { label: 'Backend Development', value: 'backend' },
      { label: 'Fullstack Development', value: 'fullstack' },
    ],
  },
  {
    id: 'skills',
    type: 'checkbox',
    label: 'Skills You Already Have',
    hint: 'Select all that apply.',
    validation: { required: true },
    options: [
      { label: 'HTML', value: 'html' },
      { label: 'CSS', value: 'css' },
      { label: 'JavaScript', value: 'javascript' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'Python', value: 'python' },
      { label: 'Git', value: 'git' },
    ],
  },

  // Commitment
  {
    id: 'commitmentLevel',
    type: 'range',
    label: 'How many hours per week can you commit?',
    hint: 'Drag to indicate your weekly availability.',
    unit: 'hrs',
    step: 5,
    validation: {
      required: true,
      min: 0,
      max: 60,
      minMessage: 'Please select at least 5 hours',
    },
  },

  // Essays
  {
    id: 'motivation',
    type: 'textarea',
    label: 'Why do you want to join Reduzer School?',
    placeholder: 'Tell us what drives you to pursue software engineering...',
    validation: {
      required: true,
      minLength: 50,
      maxLength: 1000,
    },
  },
  {
    id: 'obstacle',
    type: 'textarea',
    label: 'What is the biggest obstacle between you and software engineering right now?',
    placeholder: 'Be honest — we want to understand your situation...',
    validation: {
      required: true,
      minLength: 30,
      maxLength: 500,
    },
  },

  // Documents
  {
    id: 'transcript',
    type: 'file',
    label: 'Upload Academic Transcript',
    hint: 'PDF only, max 5MB.',
    validation: {
      required: true,
      accept: '.pdf',
      maxSizeMB: 5,
    },
  },
  {
    id: 'nationalId',
    type: 'file',
    label: 'Upload National ID or Passport',
    hint: 'PDF or image, max 2MB.',
    validation: {
      required: true,
      accept: '.pdf,.jpg,.jpeg,.png',
      maxSizeMB: 2,
    },
  },

  // Declaration
  {
    id: 'declaration',
    type: 'declaration',
    label:
      'I confirm that all information provided in this application is accurate and truthful. I understand that providing false information may result in disqualification.',
    validation: { required: true },
  },
];

export default function RendererDemoPage() {
  const handleSubmission = (data: Record<string, string | string[] | File | null>) => {
    console.log('Submitted data:', data);
    alert('Application submitted! Check the console for output.');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Reduzer School Application</h1>
            <p className="text-gray-600 mt-2">
              Complete all required fields to submit your application.
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