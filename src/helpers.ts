export const stdout = async (text: string, end = '\n'): Promise<number> => {
	return await Deno.stdout.write(new TextEncoder().encode(`${text}${end}`));
};

export const stderr = async (text: string, end = '\n'): Promise<number> => {
	return await Deno.stderr.write(new TextEncoder().encode(`${text}${end}`));
};

export const defaultFreddieHookContent = (hookName: string): string => {
	return `#!/usr/bin/env bash

# ${hookName} hook for @freddie/woof
# Add your ${hookName} checks below. For example:
# deno fmt --check

echo "[woof] ${hookName} hook running (edit .freddie/${hookName} to customize)"
exit 0
`;
};

export const defaultGitHookContent = (hookName: string): string => {
	return `#!/bin/sh

# proxy pre-commit hook for @freddie/woof
exec ./.freddie/${hookName} "$@"
`;
};

export const defaultExistentHookPrompt = async (): Promise<void> => {
	const message =
		`Ops, it seems that the freddie hook file already exists. Do I have permission to overwrite it? Give me the "yes" command in order to proceed:`;
	const answer = prompt(message);
	if (answer !== 'yes') {
		await stdout('Aborting.');
		Deno.exit(0);
	}
};

export const defaultHookNameCheck = async (
	hookName?: string,
): Promise<void> => {
	if (!hookName) {
		await stderr('Please, provide a hook name.');
		Deno.exit(1);
	}
};

export const formatItalic = (content: string): string => {
	return `\x1b[3m${content}\x1b[0m`;
};

export const indent = (content: string): string => `\t${content}`;
