# Contributing

Thank you for your interest in contributing to **Freddie**! Whether you are reporting bugs, suggesting features, improving documentation, or submitting code, your help is appreciated.

---

## Prerequisites

- [x] [Deno](https://deno.land/)
- [x] [Git](https://git-scm.com/)

---

## How to Contribute

### 1. Fork the Repository

Click the “Fork” button at the top right of the repository page to create your own copy.

### 2. Clone Your Fork

```sh
git clone [https://github.com/your-username/freddie.git](https://github.com/your-username/freddie.git)
cd freddie
```

### 3. Set up the project

Install dependencies and run the formatter, linter, and tests to make sure everything is working.

```sh
deno install --allow-all
deno task fmt
deno task lint
deno task test
```

### 4. Create a new branch

Branch names should be descriptive, e.g., fix/typo-in-readme or feature/add-new-hook.

```sh
git checkout -b your-branch-name
```

### 5. Make your changes

Follow the code style (deno fmt, deno lint).
Write or update tests as needed.
Update documentation if your changes affect usage.

### 6. Commit your changes and update your branch

Write clear, concise commit messages. Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) if possible.

```sh
git add .
git commit -m "feat: add support for X"
git fetch origin
git rebase origin/main
```

### 7. Push to your fork

```sh
git push origin your-branch-name
```

### 8. Create a Pull Request

Go to the repository page on GitHub and click the “New Pull Request” button. Select your branch and submit the pull request. Fill out the PR template, describing your changes and why they’re needed.

## Reporting Issues

If you find a bug or have a feature request, please open an issue on GitHub. Be sure to include a clear description of the problem and steps to reproduce it.

## Code Style

- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Use [Deno](https://deno.land/) for formatting and linting.

More information:

- Use tabs for indentation.
- Line width: 80 characters.
- Prefer single quotes.
- End statements with semicolons.

## License

By contributing to **Freddie**, you agree that your contributions will be licensed under the [MIT License](LICENSE).
