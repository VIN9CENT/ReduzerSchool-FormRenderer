# Application Form — Refactoring Guide

## Why This Refactor Happened

`ApplicationForm.tsx` was a 1 242-line file that owned everything: types,
constants, validation logic, five separate step UIs, UI atoms, submission
logic, session storage, event tracking, and state management — all in one
place. `route.ts` was heading the same direction on the backend.

With seven people on the team, every PR touched the same lines. Merge
conflicts were inevitable. The refactor breaks both files into focused,
single-responsibility modules so that each team member works in **their own
file** and PRs no longer overlap.

---

## Before vs. After

### Before

```
src/components/ApplicationForm.tsx    ← 1 242 lines, everything lives here
src/app/app/api/submit/route.ts       ← all backend logic in one file
```

### After

```
src/
  components/
    ApplicationForm.tsx               ← ~170 lines, wires modules together

  app/
    apply/
      formTypes.ts                    ← shared types, constants, INITIAL state
      validation/
        FormValidator.ts              ← class: one static method per step
      services/
        FormSubmissionService.ts      ← class: reCAPTCHA + fetch
        FormSession.ts                ← class: sessionStorage read / write
      hooks/
        useFormState.ts               ← all React state in one hook
        useFormTracking.ts            ← PostHog tracking (unchanged)
        useGritMetrics.ts             ← grit signals (unchanged)
      components/
        ui/
          FieldWrapper.tsx            ← label + hint + error wrapper
          TextInput.tsx               ← styled <input>
          Textarea.tsx                ← styled <textarea>
          RadioGroup.tsx              ← radio button list
          StepIndicator.tsx           ← progress bar + desktop stepper
        steps/
          Step1PersonalInfo.tsx       ← name, email, phone, city, country
          Step2Background.tsx         ← occupation, education, tech experience
          Step3Logistics.tsx          ← laptop, learning mode
          Step4Mindset.tsx            ← six essay fields
          Step5FinalQuestions.tsx     ← heard from, additional info
        screens/
          AlreadyAppliedScreen.tsx    ← shown when localStorage flag is set
          SuccessScreen.tsx           ← shown after a successful submit

    app/api/submit/
      route.ts                        ← ~15 lines, parses request and returns response
      ApplicationSubmissionService.ts ← orchestrates the full submission flow
      GoogleSheetsRepository.ts       ← writes a row to Google Sheets
```

---

## Module Responsibilities

### `formTypes.ts`

Single source of truth for the form's data shape. Import `FormData`,
`FormErrors`, `EventEntry`, `INITIAL_FORM_DATA`, `STEPS`, and `SESSION_KEY`
from here. Do not redefine them elsewhere.

### `FormValidator`

A class with one **static method per step**: `validateStep1`, `validateStep2`,
… plus a `validate(step, data)` dispatcher. Adding validation for a new field
means editing exactly one method. No other file changes.

```ts
// Adding a new rule to step 3:
static validateStep3(data: FormData): FormErrors {
  const e: FormErrors = {};
  if (!data.hasLaptop) e.hasLaptop = 'Please answer this question';
  if (!data.learningMode) e.learningMode = 'Please select your preferred mode';
  // add new rule here
  return e;
}
```

### `FormSubmissionService`

Handles the two async concerns of submission: getting a reCAPTCHA token and
POSTing to `/api/submit`. Returns `{ alreadyApplied: boolean }` so the
orchestrator can branch cleanly. Does not touch state.

### `FormSession`

Provides `save`, `load`, and `clear` for persisting in-progress form state to
`sessionStorage`. The orchestrator calls `FormSession.clear()` on successful
submit. Saving on each step advance is wired up by whoever owns this module.

### `useFormState`

A single React hook that returns all form state and two helpers: `setField`
(updates a field and clears its error) and `logEvent` (appends to the event
log). The orchestrator destructures everything it needs from this one hook.

### Step components (`Step1PersonalInfo` … `Step5FinalQuestions`)

Each receives `{ data, errors, set }` plus any step-specific extras (e.g.,
`onPaste` for Step 4). They render their fields and nothing else. They do
not call hooks, touch state, or fire analytics events.

### UI atoms (`FieldWrapper`, `TextInput`, `Textarea`, `RadioGroup`, `StepIndicator`)

Pure presentational components. They accept props, render HTML, and apply
Tailwind classes. They do not know anything about the form's data shape.
Once stable, these files should rarely be touched.

### `GoogleSheetsRepository`

The only place that constructs and sends a Sheets row. To add or rename a
column, edit only this file.

### `ApplicationSubmissionService`

Sits between `route.ts` and the repositories. Currently calls
`GoogleSheetsRepository.insertRow`. Future integrations (reCAPTCHA server-side
verify, CRM sync, Slack notification) are added here as new method calls,
without touching `route.ts`.

### `route.ts`

Parses the request, checks required fields, calls the service, returns a
response. It should stay under 20 lines. If you feel the urge to add logic
here, add it to `ApplicationSubmissionService` instead.

---

## Team Ownership

Assign one owner per module group. When two people need to collaborate, they
touch different files and PRs do not conflict.

`ApplicationForm.tsx` is the **integration file**. Changes to it should be
rare and reviewed by the whole team, since it imports from every module.

---

## How to Pull and Start Working

```bash
git pull origin main
```

Open your assigned file. The imports at the top tell you exactly what the file
depends on. You do not need to read `ApplicationForm.tsx` to understand your
module's job.

---

## How to Add a Feature

### Add a field to an existing step

1. Add the field key and initial value to `FormData` and `INITIAL_FORM_DATA`
   in `formTypes.ts`.
2. Add the validation rule in the corresponding `validateStepN` method in
   `FormValidator.ts`.
3. Add the JSX field in the corresponding `StepN*.tsx` component.

Three files, three PRs if needed — no overlap.

### Add a new step

1. Add the step label to `STEPS` in `formTypes.ts`.
2. Create `StepNName.tsx` in `components/steps/`.
3. Add a `validateStepN` method to `FormValidator`.
4. Register the step in `ApplicationForm.tsx` (one `{step === N && <StepN …>}`
   line and a heading string).

### Add a backend integration (e.g., send a Slack notification on submit)

Add a method call inside `ApplicationSubmissionService.submit()`. Create a
`SlackNotifier.ts` alongside `GoogleSheetsRepository.ts` if the logic is
non-trivial. `route.ts` does not change.

---

## Data Flow

```
User fills field
  └─ Step component calls set(key, value)
       └─ useFormState.setField updates data + clears error

User clicks Next
  └─ ApplicationForm.handleNext()
       ├─ FormValidator.validate(step, data)  — returns errors or {}
       ├─ useFormTracking.trackStepNComplete()  — fires PostHog event
       └─ setStep(step + 1)

User clicks Submit
  └─ ApplicationForm.handleSubmit()
       ├─ FormValidator.validate(5, data)
       ├─ FormSubmissionService.submit(data, events, posthogId)
       │    ├─ getRecaptchaToken()   — Promise.race with 10 s timeout
       │    └─ fetch('/api/submit')
       │         └─ route.ts → ApplicationSubmissionService → GoogleSheetsRepository
       ├─ trackStep5Complete(data.heardFrom)
       ├─ FormSession.clear()
       └─ setSubmitted(true)  →  renders <SuccessScreen>
```

---

## Backend — `functions/api/submit.ts`

The Cloudflare Pages Function was 722 lines with seven distinct concerns living
in one file. It has been split into a thin handler plus six focused modules
under `functions/api/_lib/`. Cloudflare Pages ignores any directory prefixed
with `_`, so none of the lib files are exposed as HTTP endpoints.

### File map

| File | Owns | Changes when |
|------|------|--------------|
| `submit.ts` | Request pipeline — rate limit → reCAPTCHA → validate → build row → write | Rarely; only if the pipeline order changes |
| `_lib/ServerValidator.ts` | `ALLOWED` option lists + `serverValidate()` | A field is added, removed, or its allowed values change |
| `_lib/RowBuilder.ts` | `buildRow()` — maps payload to the 29-column Sheet row | A column is added or renamed |
| `_lib/SheetsClient.ts` | `emailExists()` + `appendRow()` — Sheets API calls | The Sheet range or API behaviour changes |
| `_lib/GoogleAuthService.ts` | JWT build + OAuth token exchange | Never — stable Google Auth spec |
| `_lib/RecaptchaVerifier.ts` | Token verification against Google | Score threshold or action string changes |
| `_lib/RateLimiter.ts` | KV-based sliding-window rate limit | Rate limit config changes |
| `_lib/EventLogProcessor.ts` | `formatEventLog()` + `analyzeEvents()` | A new event type is added to the frontend log |

### Adding a new form field (backend checklist)

1. **`ServerValidator.ts`** — add the field to `ALLOWED` if it is a radio, or
   add a `str()` check to `serverValidate()` if it is free text.
2. **`RowBuilder.ts`** — add one line to the array returned by `buildRow()` and
   update the column comment (e.g. `// AD New Field`).
3. Update the Sheet header row in Google Sheets to match.

No other files need to change.

---

## What Did Not Change

- The form's visual design, all Tailwind classes, and user-facing behaviour are
  identical to before the refactor.
- `useFormTracking.ts` and `useGritMetrics.ts` were not modified.
- The Google Sheets column layout and all environment variables are unchanged.
  See [application-feature.md](./application-feature.md) for the full column
  reference and environment variable list.
- The backend API contract (`POST /api/submit`, field names, response codes)
  is unchanged. The frontend and backend are drop-in compatible with the old
  versions.
