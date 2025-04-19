export const GIT_FOLDER = './.git/hooks';

export const FREDDIE_FOLDER = './.freddie';

export const DEFAULT_PRE_COMMIT_CONTENT = `#!/usr/bin/env bash
# pre-commit hook for @freddie/woof
# Add your pre-commit checks below. For example:
# deno fmt --check
# deno lint
# deno test

echo "[woof] pre-commit hook running (edit .freddie/pre-commit to customize)"
exit 0
`;

export const PROXY_HOOK_CONTENT = {
	'pre-commit': `#!/bin/sh
  # proxy pre-commit hook for @freddie/woof
  exec ./.freddie/pre-commit "$@"
  `,
};
