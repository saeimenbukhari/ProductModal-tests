# Product Modal Test Automation

## Project Overview

This project contains automated tests for verifying the functionality of the product modal in an e-commerce application. The tests are built using [Playwright](https://playwright.dev/), a powerful end-to-end testing framework. The focus is on ensuring the UI components, such as product cards, color selections, and product details, function correctly across different scenarios.

## Project Structure

The project follows the Page Object Model (POM) to organize test code efficiently. This structure allows for easier maintenance and reusability of test code.

## Installation

To get started with this project, follow the steps below to set up your local development environment.

### 1. Clone the Repository

First, clone the repository to your local machine and navigate to the project directory. 

### 2.  Install Dependencies
Install all the necessary dependencies using npm (Node Package Manager). Ensure you have Node.js installed on your machine.
```bash
npm install
```
### 3. Install Playwright Browsers
Playwright requires specific browser binaries to run tests. Install these browsers by running:
```bash
npx playwright install
```
Alternatively, you can install the playwright VS code tension, it will help in installation. 

### 4. Run Tests
To confirm that the setup is successful, you can run a sample test:
```bash
npx playwright test
```

### Debugging Tests
To run tests in headed mode and with Playwright Inspector for debugging:
```bash
npx playwright test --headed --debug
```

### Test Reports
Playwright generates a test report by default. To view the report, run:
```bash
npx playwright show-report
```















