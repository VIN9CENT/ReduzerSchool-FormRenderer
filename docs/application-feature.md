# Application Feature — End-to-End Documentation

## Overview

The application feature lets prospective students apply to Reduzer School.
It is a 5-step form hosted at `/apply`, backed by a Cloudflare Pages Function
that validates, deduplicates, and writes each submission to a Google Sheet.

---

## User Journey

### Step 1 — Personal Information
Fields: Full Name, Email, Phone, City, Country.  
All fields are required. Email is validated against a basic regex.

### Step 2 — Background
Fields: Occupation (radio), Education (radio), Tech Experience (radio).  
- Selecting **Other** on Occupation or Education reveals a free-text "specify" input.  
- Selecting **Yes, I have some experience** reveals a required textarea for details.

### Step 3 — Logistics
Fields: Has Laptop (radio), Preferred Learning Mode (radio).  
Learning mode options: Online, Physical (Kisii), Hybrid, Need more info.

### Step 4 — Mindset & Problem Solving
Six essay textareas: Why Reduzer (minimum 100 words), Biggest Obstacle,
Time You Failed, If You Fall Behind, Requirements Change, Work Style.  
A live word counter is shown under the "Why Reduzer" field.

### Step 5 — Final Questions
Fields: How Heard (radio, "Other" expands a text input), Additional Info (optional).  
Clicking **Submit Application** triggers the API call.

### Success Screen
Shown after a `200` response. Tells the user review takes 3–5 business days.
Sets a `reduzer_school_applied` flag in `localStorage` so returning visitors
see an "Already submitted" screen instead of the form.

### Already-Submitted Screen
Shown immediately on page load if `localStorage` has the flag, or if the
server returns `409`. No form is rendered.

---

## Frontend

> The frontend has been refactored into focused single-responsibility modules.
> See [refactoring.md](./refactoring.md) for the full file structure, team
> ownership guide, and instructions for adding new fields or steps.
> The section below describes behaviour that is still accurate regardless of
> file layout.

### `src/components/ApplicationForm.tsx`

### State

| State | Purpose |
|---|---|
| `step` | Current step (1–5) |
| `data` | All form field values |
| `errors` | Per-field validation error messages |
| `submitting` | Disables the Submit button during the API call |
| `submitError` | Error message shown in the red alert box |
| `submitted` | Switches to `SuccessScreen` |
| `alreadyApplied` | Switches to `AlreadyAppliedScreen` (seeded from `localStorage`) |
| `events` | Array of `EventEntry` objects sent with the submission |

### Validation — `validate(step, data)`

Client-side validation runs on every "Next" click and on the final Submit.
Errors are shown inline beneath each field. Fields turn red when invalid.

| Step | Rules |
|---|---|
| 1 | All text fields non-empty; email matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| 2 | Occupation and Education selected; "Other" expansions required when shown; tech details required if "Yes, I have some experience" is selected |
| 3 | Laptop and learning mode selected |
| 4 | All six essays non-empty; Why Reduzer ≥ 100 words |
| 5 | How Heard selected; "Other" expansion required when shown |

### Event Tracking

Every meaningful action is appended to the `events` array and sent to the
server inside `eventLog` as a JSON string.

| Event type | When fired |
|---|---|
| `form_open` | Component mounts (seeded as initial state) |
| `step_next` | User clicks Next and passes validation |
| `step_back` | User clicks Back |
| `validation_failed` | Next/Submit clicked with errors present |
| `copy_blocked` / `cut_blocked` / `paste_blocked` | User attempts clipboard action |
| `submit_attempt` | Injected into the payload just before the API call |
| `submit_success` | After a `200` response |

Copy/paste/cut and right-click context menu are blocked on the form container
as an anti-plagiarism measure. Each blocked attempt is counted and stored.

### Navigation Guards
- **Back** clears both field errors and any submission error so the red box
  doesn't carry over to previous steps.
- The Submit button is disabled and shows a spinner while `submitting` is `true`.
- Both `submitted` and `alreadyApplied` render completely different screens —
  the form is never shown again after a successful or duplicate submission.

---

## Backend API — `functions/api/submit.ts`

Cloudflare Pages Function at `POST /api/submit`.

### Request Flow

```
Client POST /api/submit (JSON)
  │
  ├─ Content-Length > 150 KB  →  413 Request too large
  │
  ├─ Invalid JSON             →  400 Invalid JSON body
  │
  ├─ serverValidate() fails   →  422 Validation failed: <field>
  │
  ├─ Missing env vars         →  500 (logged server-side, generic message to user)
  │
  ├─ getAccessToken()         →  Google OAuth2 JWT exchange
  │
  ├─ emailExists()            →  reads Sheet1!C2:C
  │   └─ duplicate found      →  409 Already submitted
  │   └─ Sheets read fails    →  allow through (fail open)
  │
  ├─ appendRow()              →  POST to Sheets API (Sheet1!A:AC)
  │
  └─ Success                  →  200 { success: true }
```

### Server-Side Validation — `serverValidate(body)`

Runs independently of client validation (defence-in-depth).

- All required text fields must be non-empty after trimming.
- Dropdown values are checked against strict allow-lists (`ALLOWED`).
- Conditional rules mirror the client: `occupationOther`, `educationOther`,
  `techExperienceDetails`, `heardFromOther` are required when their parent
  field equals `"Other"` / `"Yes, I have some experience"`.

### Data Sanitization — `str(value, maxLen)`

Every value is passed through `str()` before being written to the sheet:
- Non-strings become empty string.
- Values are trimmed and truncated to `maxLen`.
- Values starting with `= + - @ | % \t \r` are prefixed with `'` to prevent
  spreadsheet formula injection.

"Other: …" fields are concatenated into one cell, e.g. `Other: Freelancer`.

### Duplicate Prevention — `emailExists()`

Reads column C (applicant emails) from Sheet1 before every insert.
Comparison is case-insensitive. If the Sheets read itself fails the function
returns `false` (fail open) so a transient API error never blocks a real applicant.

### Event Log Processing

Before saving, two functions transform the raw `eventLog` JSON string:

**`formatEventLog(raw)`** — produces a human-readable text cell, e.g.:
```
S1:32s | S2:7s | S3:10m9s | S4:6s | S5:6s | total:10m60s
```
Back navigations appear as `←S3`, validation failures as `!S2`.
Copy attempts appear inline as `copy`.

**`analyzeEvents(raw)`** — extracts numeric metrics written to dedicated
columns (V–AC), enabling Sheets formulas like `=AVERAGE(V:V)`.

---

## Google Sheets Setup

### One-Time Setup

1. Create a Google Cloud project and enable the **Google Sheets API**.
2. Create a **Service Account**, download the JSON key file.
3. Share your spreadsheet with the service account email (Editor access).
4. Add a header row to **Sheet1** matching the columns below (row 1).

### Column Reference

| Col | Header | Notes |
|-----|--------|-------|
| A | Timestamp | ISO 8601, UTC |
| B | Full Name | |
| C | Email | Used for duplicate check |
| D | Phone | |
| E | City | |
| F | Country | |
| G | Occupation | "Other: …" format for custom values |
| H | Education | "Other: …" format for custom values |
| I | Has Tech Experience | Full option string |
| J | Tech Exp Details | Empty when "No" |
| K | Has Laptop | "Yes" / "No" |
| L | Learning Mode | Full option string |
| M | Why Reduzer | Essay |
| N | Biggest Obstacle | Essay |
| O | Time Failed | Essay |
| P | If Fall Behind | Essay |
| Q | Req Changes | Essay |
| R | Work Style | Essay |
| S | Heard From | "Other: …" format for custom values |
| T | Additional Info | Optional |
| U | Event Log | Formatted text summary |
| V | Session (s) | `form_open` → `submit_attempt` in seconds |
| W | S1 (s) | Time spent on Step 1 |
| X | S2 (s) | Time spent on Step 2 |
| Y | S3 (s) | Time spent on Step 3 (Mindset — usually longest) |
| Z | S4 (s) | Time spent on Step 4 |
| AA | S5 (s) | Time spent on Step 5 |
| AB | Copy Attempts | Number of blocked copy/cut/paste actions |
| AC | Validation Fails | Number of times Next/Submit was clicked with errors |

> **Note on "Other" values:** Use `COUNTIF(G:G,"Other*")` (wildcard) to count
> all "Other" occupation entries in dashboard formulas.

---

## Environment Variables

Set in **Cloudflare Pages → Settings → Environment Variables**.

| Variable | Description |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | e.g. `my-sa@my-project.iam.gserviceaccount.com` |
| `GOOGLE_PRIVATE_KEY` | Full PEM key from the service account JSON, including `-----BEGIN/END PRIVATE KEY-----` |
| `GOOGLE_SPREADSHEET_ID` | The ID from the Sheet URL: `.../spreadsheets/d/<ID>/edit` |

If any of these are missing the API returns `500` with a generic user message
and logs the specific missing variable server-side (visible in Cloudflare Pages logs).

---

## Dashboard Formulas (Google Sheets)

Create a second sheet tab called **Dashboard** and reference Sheet1:

```
Total applications       =COUNTA(Sheet1!C2:C)
Average session (min)    =AVERAGE(Sheet1!V2:V)/60
Avg time on Mindset (min)=AVERAGE(Sheet1!Y2:Y)/60
Has laptop (%)           =COUNTIF(Sheet1!K2:K,"Yes")/COUNTA(Sheet1!K2:K)
Copy attempt rate (%)    =COUNTIF(Sheet1!AB2:AB,">"&0)/COUNTA(Sheet1!C2:C)
Online learners          =COUNTIF(Sheet1!L2:L,"Online*")
```

---

## Error Handling Reference

| Scenario | HTTP | User sees | Dev sees |
|---|---|---|---|
| Payload > 150 KB | 413 | "Request too large" | — |
| Malformed JSON | 400 | "Invalid JSON body" | — |
| Validation failure | 422 | Field-level error (client); `Validation failed: <field>` (server bypass) | Field name in response |
| Missing env vars | 500 | "Something went wrong on our end." | Cloudflare Pages log with variable name |
| Sheets API error | 500 | "Failed to save application. Please try again." | `console.error` with full Sheets error body |
| Duplicate email | 409 | "An application with this email address has already been submitted…" | — |

---

## Known Limitation — Drop-off Tracking

Drop-off (users who open the form but never submit) **cannot be tracked** through
this endpoint because data is only sent on submission. To measure which step
users abandon at, connect the site to **Google Analytics 4** or **Cloudflare
Web Analytics** and fire a custom event on each "Next" click. The per-step
timing in columns W–AA reflects completed submissions only.
