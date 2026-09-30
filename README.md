# Playwright JavaScript API Test Framework

This project is an API test suite built with Playwright Test. It covers authentication and booking operations on RESTful Booker, plus read requests to JSONPlaceholder.

## Project Structure

```text
Playwright_Js_API_Test/
├── .github/
│   └── workflows/
│       └── playwright.yml       # GitHub Actions test workflow
├── config/
│   ├── qa.config.js             # QA Playwright configuration
│   └── staging.config.js        # Staging Playwright configuration
├── fixtures/
│   └── testAPIFixture.js        # Shared auth and booking setup fixtures
├── tests/
│   └── APITests/
│       ├── deleteBookingID.spec.js
│       ├── getCall_BookingID.spec.js
│       ├── getCall_Users.spec.js
│       ├── patchCall_BookingID.spec.js
│       ├── postCall_BookingID_Auth.spec.js
│       ├── postCall_BookingID.spec.js
│       └── putCall_BookingID.spec.js
├── utils/
│   ├── dateUtils.js             # Current date helper
│   ├── fileUtils.js             # JSON file reader
│   └── logger.js                # Timestamped console logger
├── test-results/                # Generated test artifacts
├── my-report/                   # Previously generated HTML report
├── playwright-report/           # HTML report output
├── framework.js                 # Framework notes
├── framework.md                 # This documentation
├── package.json
├── package-lock.json
└── playwright.config.js          # Default Playwright configuration
```

## Test Coverage

- Authentication tests verify valid and invalid RESTful Booker credentials.
- Booking tests create, update, and delete bookings. Shared fixtures provide an auth response and create a booking for mutation tests.
- Read tests query JSONPlaceholder posts and users.

## Configuration and Reports

The default configuration discovers tests under `tests/`, runs Chromium with one worker, and writes an HTML report to `playwright-report/`. Screenshots, video, and traces are configured for failures/retries. QA and staging configurations are available separately.

The current API tests use absolute endpoint URLs. The environment configurations currently share the same `BASE_URL` fallback, so setting `BASE_URL` does not redirect those hard-coded API requests. Update the test endpoints if environment-specific routing is needed.

## Commands

Run these from the project root:

```bash
npm test                  # Run the full suite
npm run test:headed       # Run with a visible browser
npm run test:qa           # Use config/qa.config.js
npm run test:staging      # Use config/staging.config.js
npm run report            # Open the latest HTML report
```

## Continuous Integration

The GitHub Actions workflow runs `npm ci`, installs Playwright browsers, and runs the full suite on pushes and pull requests targeting `main` or `master`. It uploads `playwright-report/` as a workflow artifact.
