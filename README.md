# 🐶 Freddie

Your git's best friend. Freddie is a CLI tool that helps you manage git hooks on
deno.

_This is a tribute to my best friend and the goodest boy ever, Freddie, who sadly passed away last April._
_I will always love you, no matter what, and I hope this lib can help people the same way you helped me through the last 4 years together. See you on the other side, buddy! ❤️‍🩹_

## Installation

As for the moment, Freddie hooks are available only for Deno runtime. You can install it using deno install, with the following command:

```bash
deno install --global --allow-run --allow-write --allow-read --name=freddie @freddie/hooks
```

_FYI: Since this is a command-line interface tool, we use `deno install` instead of `deno add jsr:` to turn it into a globally available executable command on your system. Plus, if you have any doubts about the needed permissions, take a look [here](https://docs.deno.com/runtime/fundamentals/security/#permissions)._

### Adding Freddie to your path

If you want to add Deno and consequently Freddie to your path, you can add the following line to your shell configuration file (e.g. `.bashrc`, `.zshrc`, etc.):

```bash
export PATH="$PATH:$HOME/.deno/bin"
```

### Uninstalling Freddie

If you want to uninstall Freddie globally, you can use the following command:

```bash
rm "$HOME/.deno/bin/freddie"
```

Hope you had a great time with us! 🩵

## Usage

When using the CLI, you can use the `freddie` command to manage your git hooks - if that's the name you chose during the installation. Here's an example of how to use it:

```bash
freddie help
```

You should see something like this:

```text
🐶 Here are the commands I know:
  - add: Adds a new hook to your Freddie library;
  - destroy: Removes a hook from your Freddie library;
  - list: Lists all hooks in your Freddie library;
  - show: Shows the content of a hook;
  - sleep: Suspends a hook;
  - wake: Resumes a hook;
  - uninstall: Uninstalls Freddie from your system;
  - welcome: Installs Freddie to your system.
```

## Tricks

If you want to know more about what tricks Freddie knows, you can take a look on the [tricks](./docs/tricks.md) section of our _docs_ folder.

## Contributing

If you want to contribute to Freddie, you can take a look on the [contributing](./docs/contributing.md) section of our _docs_ folder.

## License

MIT License
