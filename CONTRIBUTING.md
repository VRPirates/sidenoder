# Contributing to Sidenoder

Thank you for your interest in contributing to **Sidenoder**! We appreciate your
help in improving the project. Please follow the guidelines below to get started.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
- [Setting Up Your Environment](#setting-up-your-environment)
- [Running the Project](#running-the-project)
- [Making Changes](#making-changes)
  - [Commit Guidelines](#commit-guidelines)
- [Submitting Your Contribution](#submitting-your-contribution)
  - [Pull Request Checklist](#pull-request-checklist)
- [Code Style Guidelines](#code-style-guidelines)
- [Reporting Issues](#reporting-issues)

## Getting Started

To contribute to Sidenoder, you’ll need to:

1. Fork the repository from [Sidenoder GitHub](https://github.com/VRPirates/sidenoder).
2. Clone your forked repository to your local machine.

   ```bash
   git clone https://github.com/YOUR_USERNAME/sidenoder.git
   ```

3. Set up an upstream remote to make it easy to keep your fork up-to-date with
   VRPirates repository:

   ```bash
   git remote add upstream https://github.com/VRPirates/sidenoder.git
   ```

4. Navigate to the project directory:

   ```bash
   cd sidenoder
   ```

## Setting Up Your Environment

Sidenoder is an Electron app, and you will need to have **Node.js** and **npm**
installed. You can download and install Node.js from [nodejs.org](https://nodejs.org).

After installing Node.js, run the following command to install the project dependencies:

```bash
npm install
```

## Running the Project

Once the dependencies are installed, you can run the project locally in development
mode. Use the following command:

```bash
npm start
```

This will start the Electron app, and any changes you make will be reflected in
real time.

## Making Changes

Before making any changes, ensure that your local repository is up to date with the
latest changes from the main repository:

```bash
git checkout main
git pull upstream main
```

Now, create a new branch for your feature or bug fix:

```bash
git switch -c your-feature-branch-name
```

Make sure to keep your changes isolated to one specific task or issue.

### Commit Guidelines

Committing your code is simple, please stick to these rules:

- Write clear, concise commit messages.
- Use one commit per feature or bug fix.
- Use present tense ("add feature" instead of "added feature").

```bash
# Commit your code
# Be sure to follow the format for commits: `type: description`
# e.g. `fix: correct issue with fetch request`
git commit -ma "fix: correct issue with fetch request"
```

The following types are valid:

| **Type**   | **Description**                                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| `build`    | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |
| `chore`    | Other changes that don't modify `src` or test files                                                         |
| `ci`       | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| `docs`     | Documentation only changes                                                                                  |
| `feat`     | A new feature                                                                                               |
| `fix`      | A bug fix                                                                                                   |
| `perf`     | Performance improvements                                                                                    |
| `refactor` | A code change that neither fixes a bug nor adds a feature                                                   |
| `revert`   | Reverts a previous commit                                                                                   |
| `style`    | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |
| `test`     | Adding missing tests or correcting existing tests                                                           |

## Submitting Your Contribution

Once you're done with your changes:

1. Push your branch to your forked repository:

   ```bash
   git push origin your-feature-branch-name
   ```

2. Go to the original repository at [Sidenoder GitHub](https://github.com/VRPirates/sidenoder).
3. Click on the `[Pull Request]` button.
4. Ensure your pull request has a clear description of what you’ve done and reference
   any relevant issues (if applicable).

### Pull Request Checklist

**NOTE: Always Ensure that the code works by running the app locally.**

After submitting, a project maintainer will review your pull request. You may be
asked to make changes, so please respond to feedback promptly.

## Code Style Guidelines

To maintain consistency, ensure that your code follows the project's coding standards.
We use the following tools:

- **ESLint**: Helps catch common errors and enforces code consistency.
- **MarkdownLint**: Enforces markdown consistency across documentation.
- **Prettier**: Formats code.
- **StyleLint**: Helps catch common CSS errors and enforces code consistency.

These tools will automatically run when you attempt to commit your code and warn
you of any issues.

## Reporting Issues

If you encounter any issues or have suggestions for improvements, please open an
issue on the [Issues page](https://github.com/VRPirates/sidenoder/issues).
Be sure to include:

- A clear and descriptive title.
- Steps to reproduce the issue, if applicable.
- Screenshots or logs if relevant.

You can also browse existing issues and contribute by helping to resolve them.

---

Thank you for contributing to Sidenoder! Your support is highly appreciated, and
we look forward to seeing your pull requests.
