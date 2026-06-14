ReduzerSchool — QuestionRenderer

A reusable, fully validated dynamic form renderer built with Next.js and TypeScript. Renders any question array into a working form — no hardcoded questions.


How to run the app

bashnpm install
npm run dev

Open http://localhost:3000/apply/demo to see the component in action.


How to run tests

bashnpm test

To run in watch mode:

bashnpm test -- --watch


Example question data

tsconst questions: Question[] = [
  {
    id: 'fullName',
    type: 'text',
    label: 'Full Name',
    validation: { required: true, minLength: 2 },
  },
  {
    id: 'motivation',
    type: 'textarea',
    label: 'Why do you want to join Reduzer School?',
    validation: { required: true, minLength: 50 },
  },
  {
    id: 'educationLevel',
    type: 'select',
    label: 'Highest Education Level',
    options: [
      { label: 'High School / KCSE', value: 'highschool' },
      { label: 'Diploma', value: 'diploma' },
      { label: "Bachelor's Degree", value: 'bachelors' },
      { label: "Master's Degree or Higher", value: 'masters' },
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
    label: 'Skills You Already Have',
    options: [
      { label: 'HTML', value: 'html' },
      { label: 'CSS', value: 'css' },
      { label: 'JavaScript', value: 'javascript' },
      { label: 'TypeScript', value: 'typescript' },
    ],
    validation: { required: true },
  },
];

Expected submitted output

json{
  "fullName": "Lennox Omondi",
  "motivation": "I want to join because I am serious about becoming a software engineer...",
  "educationLevel": "bachelors",
  "preferredTrack": "fullstack",
  "skills": ["html", "css", "javascript"]
}


How each question type works

TypeRendered elementAnswer valuetext<input type="text" />stringtextarea<textarea />stringselect<select /> with <option /> elementsstringradioOne <input type="radio" /> per optionstringcheckboxOne <input type="checkbox" /> per optionstring[]


text — Single line input. Supports required, minLength, maxLength, and pattern validation.
textarea — Multi-line input. Supports the same validation rules as text.
select — Dropdown. Invalid when no option is selected and field is required.
radio — Single choice from a list. Options share the same name so only one can be selected. Grouped in a <fieldset>.
checkbox — Multiple choice. Answer is always submitted as an array. Grouped in a <fieldset>.



How allowPasting works

The QuestionRenderer component accepts an allowPasting boolean prop.

tsx// Pasting disabled (default for assessment use)
<QuestionRenderer questions={questions} onSubmit={handleSubmit} allowPasting={false} />

// Pasting enabled
<QuestionRenderer questions={questions} onSubmit={handleSubmit} allowPasting={true} />


When allowPasting={false} — onPaste is intercepted and e.preventDefault() is called on all text and textarea fields. Users must type their answers manually.
When allowPasting={true} — pasting works normally.
Paste restriction applies only to text and textarea. It does not affect select, radio, or checkbox.



Assumptions made


No hardcoded questions — the component renders entirely from the questions prop. Changing the array changes the form with no component modifications needed.
Validation is per-field and real-time — errors appear after a field is touched (blurred or changed), not on initial render.
Checkbox answers are always arrays — even when only one option is selected, the answer is string[].
All other answer types are strings — including radio and select.
Submit button — disabled until every required field passes all validation rules. Enabled state is computed with useMemo for performance.
Accessibility — all inputs have matching htmlFor/id pairs, error messages use aria-describedby, and radio/checkbox groups use <fieldset> + <legend>.
Styling — Tailwind CSS utility classes. No external UI library.



Project structure

src/
├── app/
│   └── apply/
│       ├── components/
│       │   ├── screens/
│       │   │   ├── AlreadyAppliedScreen.tsx
│       │   │   └── SuccessScreen.tsx
│       │   └── ui/
│       │       ├── QuestionRenderer.tsx   ← main component
│       │       └── QuestionRenderer.test.tsx
│       ├── demo/
│       │   └── page.tsx                  ← demo page
│       └── validation/
│           └── QuestionTypes.ts          ← TypeScript types