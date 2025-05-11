# 🐾 Freddie’s Tricks

This document describes all the pawsome things Freddie can do — or is learning
to do — to manage your git hooks. Whether it's fetching a new hook or rolling
over and disabling one, Freddie's got your back (and your repo). 🤎

## ✅ Initialization & Setup

Freddie starts by sniffing around and making himself at home in your repo. You
can do it by running `freddie welcome`.

### ✅ Initialize Git Hook Management

- Creates a .freddie directory at the root of the repository — Freddie's
  personal doghouse. 🏠
- Checks if .git/hooks exists; if not, gives a friendly warning so you can
  initialize Git properly.
- As a welcome gift, Freddie adds a sample pre-commit hook so you can test that
  everything is working.
- You’re free to replace or edit it — he won’t take it personally!

## ⌛ Hook Management Commands

These commands let you add, remove, and manage hooks like a true pack leader.

### ✅ Add a New Hook

- Command: `freddie add <hook-name>`
- Adds a new hook file in .freddie/ and sets up a proxy in .git/hooks/.
- Warns if the hook already exists, and asks before overwriting.

### ✅ Remove a Hook

- Command: `freddie destroy <hook-name>`
- Removes the hook from .freddie/ and deletes its proxy from .git/hooks/.
- Asks for confirmation before removal — safety first!

### ✅ List All Managed Hooks

- Command: `freddie sniff`
- Shows all hooks Freddie is currently managing.

### ⌛ Show Script(s) for a Hook

- Command: `freddie fetch <hook-name>`
- Displays the content of the specified hook script managed by Freddie.

## ⌛ Enable/Disable Hooks

Sometimes Freddie needs to rest. Sometimes he’s ready to go full fetch mode.
These commands control his energy levels. ⚡

### ⌛ Enable/Disable a Specific Hook

- Command: `freddie sleep <hook-name>`
- Temporarily disables the specified hook without deleting it.

- Command: `freddie wake <hook-name>`
- Temporarily enables the specified hook.

### ⌛ Show Status of All Hooks

- Command: `freddie check`
- Lists all hooks along with their current state: enabled or disabled.

## ⌛ Uninstall

Need to clean the yard? Freddie can pack up and leave with a simple command. 💨

### ⌛ Uninstall Freddie

- Command: `freddie bye`
- Removes Freddie's personal doghouse and all hooks managed by him.

## ⌛ Advanced & Bonus Features

Freddie may be tiny, but he’s working on some advanced tricks too. ✨

### ⌛ Logging & Error Reporting

- Logs the execution of hooks and reports any errors that happen during runtime.

### ⌛ CI/CD Friendly Mode

- Supports CI/CD pipelines by allowing hooks to be optionally skipped in CI
  environments.
