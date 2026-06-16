# ReduzerSchool — QuestionRenderer

A reusable, fully validated dynamic form renderer built with Next.js and TypeScript. Renders any question array into a working form; no hardcoded questions, no hardcoded validation messages.

---

## How to run the app

```bash
- Create a directory where you want the project to live and navigate into it then run the following commands on your terminal:
git clone git@github.com:VIN9CENT/ReduzerSchool-FormRenderer.git
cd ReduzerSchool-QuestionRenderer
npm install
npm run dev
```

Open [http://localhost:3000/apply/demo](http://localhost:3000/apply/demo) to see the component in action.

---

## How to run tests

```bash
npm test
```

To run in watch mode:

```bash
npm jest  --watch
```

---

## Supported question types

| Type | Rendered element | Answer value |
|------|-----------------|--------------|
| `text` | `<input type="text" />` | `string` |
| `email` | `<input type="email" />` | `string` |
| `tel` | `<input type="tel" />` | `string` |
| `url` | `<input type="url" />` | `string` |
| `number` | `<input type="number" />` | `string` |
| `date` | `<input type="date" />` | `string` (YYYY-MM-DD) |
| `range` | `<input type="range" />` with live value display | `string` |
| `textarea` | `<textarea />` with character counter | `string` |
| `select` | `<select />` with `<option />` elements | `string` |
| `radio` | One `<input type="radio" />` per option | `string` |
| `checkbox` | One `<input type="checkbox" />` per option | `string[]` |
| `file` | Drag-and-drop file upload zone | `File \| null` |
| `declaration` | Single checkbox agreement | `string[]` |

---

## Validation rules

Every question accepts an optional `validation` object. All error messages have sensible defaults and can be overridden with a custom `*Message` property.

```ts
validation: {
  required?: boolean;
  requiredMessage?: string;

  minLength?: number;
  minLengthMessage?: string;

  maxLength?: number;
  maxLengthMessage?: string;

  pattern?: string;        // regex string
  patternMessage?: string;

  min?: number | string;   // number for number/range, date string for date
  minMessage?: string;

  max?: number | string;
  maxMessage?: string;

  accept?: string;         // file types e.g. ".pdf,.jpg"
  maxSizeMB?: number;
  maxSizeMessage?: string;
}
```

### Built-in regex patterns (used in demo)

| Field | Pattern | Covers |
|-------|---------|--------|
| Email | `^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$` | Standard email format |
| Kenyan phone | `^(\+?254\|0)(7[0-9]{8}\|1[0-9]{8})$` | `07XX`, `01XX`, `+2547XX`, `2547XX` |
| URL | `^https?:\/\/(www\.)?[-a-zA-Z0-9...` | Must start with `https://` |
| Full name | `^[a-zA-Z]+([ \-][a-zA-Z]+)+$` | At least two words |


---

## Example question data

```ts
const questions: Question[] = [
  {
    id: 'fullName',
    type: 'text',
    label: 'Full Name',
    placeholder: 'e.g. Jane Mwangi',
    validation: {
      required: true,
      minLength: 2,
      pattern: '^[a-zA-Z]+([ \\-][a-zA-Z]+)+$',
      patternMessage: 'Enter your first and last name',
    },
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'e.g. jane@example.com',
    validation: {
      required: true,
      pattern: '^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$',
      patternMessage: 'Enter a valid email address',
    },
  },
  {
    id: 'phone',
    type: 'tel',
    label: 'Phone Number',
    placeholder: 'e.g. 0712 345 678',
    hint: 'Kenyan number — 07XXXXXXXX or 01XXXXXXXX',
    validation: {
      required: true,
      pattern: '^(\\+?254|0)(7[0-9]{8}|1[0-9]{8})$',
      patternMessage: 'Enter a valid Kenyan phone number e.g. 0712345678',
    },
  },
  {
    id: 'dateOfBirth',
    type: 'date',
    label: 'Date of Birth',
    hint: 'You must be at least 16 years old.',
    validation: {
      required: true,
      max: '2009-06-15',
      maxMessage: 'You must be at least 16 years old',
    },
  },
  {
    id: 'motivation',
    type: 'textarea',
    label: 'Why do you want to join Reduzer School?',
    placeholder: 'Tell us what drives you...',
    validation: { required: true, minLength: 50, maxLength: 1000 },
  },
  {
    id: 'preferredTrack',
    type: 'radio',
    label: 'Preferred Track',
    validation: { required: true },
    options: [
      { label: 'Frontend', value: 'frontend' },
      { label: 'Backend', value: 'backend' },
      { label: 'Fullstack', value: 'fullstack' },
    ],
  },
  {
    id: 'skills',
    type: 'checkbox',
    label: 'Skills You Already Have',
    validation: { required: true },
    options: [
      { label: 'HTML', value: 'html' },
      { label: 'CSS', value: 'css' },
      { label: 'JavaScript', value: 'javascript' },
    ],
  },
  {
    id: 'commitmentLevel',
    type: 'range',
    label: 'Hours per week you can commit',
    unit: 'hrs',
    step: 5,
    validation: { required: true, min: 0, max: 60 },
  },
  {
    id: 'transcript',
    type: 'file',
    label: 'Upload Academic Transcript',
    hint: 'PDF only, max 5MB.',
    validation: { required: true, accept: '.pdf', maxSizeMB: 5 },
  },
  {
    id: 'declaration',
    type: 'declaration',
    label: 'I confirm all information provided is accurate and truthful.',
    validation: { required: true },
  },
];
```

### Expected submitted output

```json
{
  "fullName": "Jane Mwangi",
  "email": "jane@example.com",
  "phone": "0712345678",
  "dateOfBirth": "2000-03-15",
  "motivation": "I want to join because...",
  "preferredTrack": "fullstack",
  "skills": ["html", "css", "javascript"],
  "commitmentLevel": "40",
  "transcript": File,
  "declaration": ["agreed"]
}
```

---

## How allowPasting works

```tsx
// Pasting disabled — users must type manually
<QuestionRenderer questions={questions} onSubmit={handleSubmit} allowPasting={false} />

// Pasting enabled
<QuestionRenderer questions={questions} onSubmit={handleSubmit} allowPasting={true} />
```

- Applies only to `text`, `email`, and `textarea` fields

---

## Optional question properties

| Property | Type | Description |
|----------|------|-------------|
| `placeholder` | `string` | Hint text inside `text`, `email`, `tel`, `url`, `number`, `textarea` |
| `hint` | `string` | Helper text shown below the label |
| `unit` | `string` | Label shown next to `number` and `range` fields e.g. `/ 4.0`, `hrs` |
| `step` | `number` | Increment for `number` and `range` fields |

---

## Project structure

```
src/
├── app/
│   └── apply/
│       ├── components/
│       │   ├── screens/
│       │   │   ├── AlreadyAppliedScreen.tsx
│       │   │   └── SuccessScreen.tsx
│       │   └── ui/
│       │       ├── QuestionRenderer.tsx       ← main component
│       │       └── QuestionRenderer.test.tsx
│       ├── demo/
│       │   └── page.tsx                       ← demo page
│       └── validation/
│           └── QuestionTypes.ts               ← TypeScript types
```

---

## Design & Technical Assumptions

1. **Brand Identity:** The form styling uses the Reduzer brand colors (Red, Black, and White). 
2. **Next.js Environment:** The component uses the `'use client'` directive as it is intended for use within a Next.js App Router environment and requires client-side state management.

3. **Validation Timing:** Validation triggers on the `onChange` event, but error messages only appear after a field has been "touched" (interacted with) to ensure a smooth, non-distracting user experience.

4. **Strict Typing:** All data structures are strictly typed using TypeScript interfaces to ensure data integrity and prevent runtime errors.

5. **Accessibility:** We assumed standard screen-reader support was required, implementing `fieldset`/`legend` for groups and `aria-invalid`/`aria-describedby` for error reporting.