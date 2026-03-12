# Messaging App Tests

This repository contains a mini Playwright test framework built with TypeScript to automate a realistic scenario in a simple messaging app without needing a backend.

## Project Structure

- \`dummy-messaging-app.html\`: The target UI representing a simple messaging app.
- \`page-objects/MessagingPage.ts\`: Page Object Model separating interactions from the tests.
- \`tests/messaging.spec.ts\`: Actual tests applying Playwright and simulating the backend via \`page.route\`.
- \`playwright.config.ts\`: The framework's config where reporting points to Allure Report.
- \`.github/workflows/playwright.yml\`: Basic GitHub Actions workflow to run tests on push and pull requests.

## Setup Instructions

### Prerequisites

- Node.js (18 or newer recommended).

### Install Connections

If this is your first time setting everything up, run:
\`\`\`bash
npm install
npx playwright install
\`\`\`

### Run Tests locally

To execute the tests:
\`\`\`bash
npx playwright test
\`\`\`

### View Reports

After a test execution, Allure results will be stored locally. You can view them by running:
\`\`\`bash
npx allure serve allure-results
\`\`\`

## Tools & AI Used

- **Playwright** framework combined with **TypeScript**.
- **Allure Report** for generating rich test execution reports.
- **GitHub Copilot / Gemini 3.1 Pro (Preview)** - AI was used to accelerate the scaffolding phase, write boilerplate POM structure, structure GitHub actions and rapidly mock out the backend fetch requests safely.

## Decisions Made & Reasoning

- **Page Object Model (POM)**: Ensures test code is decoupled from the DOM. If the UI changes slightly, we only need to update \`MessagingPage.ts\` without breaking our spec tests.
- **API Mocking**: I chose \`page.route\` instead of a real backend, adding a 500ms delay to simulate network latency realistically. Doing this allows atomic frontend testing without maintaining a server app.
- **Local File Serving**: I read the HTML directly using \`file://\` protocol logic with \`process.cwd()\` in \`MessagingPage.navigate()\`. This bypasses setting up Express/Vite for a static simple HTML.

## Future Scaling Implications

- **Dynamic Port Serving**: For real pipelines, a static webserver like \`http-server\` can be launched during tests instead of direct \`file://\` references.
- **Visual Regression**: Adding \`expect(page).toHaveScreenshot()\` for components as the UI gets significantly complex.
- **Test Matrix Generation**: Separating network failure test conditions like API returning \`500 Internal error\` or \`Timeout\` checks.




## Test Planning (Insights Overview)
The second part of the assignment focuses on manual test strategy and design for the Insights Overview dashboard.

The following documents can be found in the `/docs` folder:
* **[STP.md](./docs/STP.md):** Software Test Plan including strategy and documented assumptions.
* **[STD.md](./docs/STD.md):** Detailed Test Cases covering data integrity, filtering, and UI/UX.