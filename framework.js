/*
Playwright API Test Framework Instructions

Project structure
- Add API tests under tests/APITests/ and name them after the HTTP operation and resource.
- Keep shared request setup in fixtures/testAPIFixture.js, not in another spec file.
- Put reusable, non-test helpers in utils/.

API test conventions
- Use Playwright Test's request fixture for HTTP calls.
- Import test and expect from fixtures/testAPIFixture.js when a test needs shared fixtures.
- Use postCall01 for an authentication response and bookingId for a fresh booking ID.
- Use the ID returned by setup instead of relying on a hard-coded booking ID.
- Assert response status and relevant headers and body fields.
- Parse each response body once. Use json() for JSON responses and text() for plain-text responses such as booking deletion.
- Keep each test independent; do not import one spec file into another.

Configuration and reporting
- The default Playwright configuration is playwright.config.js.
- QA and staging configurations are config/qa.config.js and config/staging.config.js.
- HTML reports are written to playwright-report/; test artifacts are written to test-results/.
- API specs currently use absolute endpoint URLs, so changing BASE_URL alone does not switch their target environment.

Commands
- npm test: run the full suite.
- npm run test:headed: run with a visible browser.
- npm run test:qa: run with the QA configuration.
- npm run test:staging: run with the staging configuration.
- npm run report: open the latest HTML report.

CI
- .github/workflows/playwright.yml runs the tests on pushes and pull requests to main and master.
*/
