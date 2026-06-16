
## What this file is for
AI tools are allowed. Undeclared, unverified, or unowned AI use is not.

You are responsible for everything in this repository — whether AI helped produce it or not. If you cannot explain it, test it, or modify it, you do not own it.



## Did you use AI?

- [ ] No — all work in this repository is entirely my own.
- [x] Yes — I used AI tools and have declared the details below.

> If **No**, skip to the [Declaration](#declaration) section and sign.  
> If **Yes**, complete every section below.



## Tools used

| Tool | Provider | What I used it for |
|---|---|---|
| | | |
| | | |


| Gemini | Google | Generating QuestionRenderer test suite, debugging Jest config 



> Common tools include: ChatGPT, Claude, Gemini, GitHub Copilot, Cursor, Windsurf, Perplexity, Tabnine, Grammarly, DeepL, and any other AI-powered assistant.  
> Basic IDE autocomplete (bracket closing, common keywords) does not need to be declared.



## How AI was used

Check every box that applies.

- [x] Understanding the assignment or requirements
- [x] Researching concepts or syntax
- [x] Brainstorming approaches
- [x] Generating code that I reviewed and modified
- [ ] Generating code that I used with minimal changes
- [x] Debugging errors
- [x] Improving code structure or readability
- [x] Writing or improving tests
- [x] Writing or improving documentation
- [ ] Other:

```
Describe any other use here:
```



## What AI influenced

List the specific files, functions, or sections where AI played a role.



| File or section | What AI contributed | What I changed, verified, or rewrote |
|QuestionTypes.ts|
| | | |
| | | |

| QuestionRenderer.test.tsx | Initial test cases for all question types, validation, paste blocking | I verified that all the test cases were correct. |
| README.md| README.md structure and documentation to ensure all important documentation are captured| I verified that all important documenations were added, removed some unnecessary documentation|


> If AI only gave explanations and no final code or content was used, state that clearly.



## Key prompts and responses

List the most important AI interactions that shaped the final submission.
- Test configuration, decisiont on weather to pick jest or vitest for automated test.

| What I asked AI | What AI suggested | Used in final work? | How I verified it |
|---|---|---|---|
| | | Yes / No | |
| | | Yes / No | |


|I asked for a recoomedation on what testing toool to use for a nextjs project| AI suggested Jest| I picked jest| I researched at the official nextjs documentations|
> If asked during a review, you must be able to show full chat logs or screenshots.



## Verification

### Commands I ran

```bash
npm install
npm run dev
npm test
npx jest -- watch
npm install -D @types/jest

```

### What I manually checked

- [x] The project runs without errors
- [x] Core features work as expected
- [x] Edge cases and error states are handled
- [x] All tests pass
- [x] The README instructions are accurate

### Bugs I found and fixed

| Bug or issue | How I found it | How I fixed it |
|---|---|---|
|Cascading Renders| ESLint warning in VS Code.|Moved state initialization from useEffect to a function inside useState. |
|Missing Jest Matchers| toBeInTheDocument was red in the editor.|Updated tsconfig.json types and installed @types/jest.|

> If you found no bugs, explain how you confirmed the work was correct.



## Understanding check

Answer in your own words. Do not paste AI explanations here.

**What does this project do and how does it work?**

```
It is a dynamic form generator. Instead of hardcoding inputs, it maps over an array of question objects. It uses a central validation engine to check if the user's input meets the rules (like minLength) and uses that to control the Submit button state.
```

**Which part are you most confident about?**

```
The dynamic rendering for all input types defined in the QuestionTypes.ts
```

**Which part are you still unsure about?**

```
Your answer: Jest configuration especialy wwriting the tests 
```



## Declaration

- [x] I did not submit AI-generated work that I do not understand.
- [x] I did not fabricate test results or pass status.
- [x] I did not submit another person's work as my own.
- [x] I did not hide AI use where AI was used.
- [x] I did not enter sensitive, private, or confidential data into any public AI tool.
- [x] I understand I may be asked to explain or modify this work during a review.

**By committing this file, I confirm that this project is my responsibility and that I can defend it.**