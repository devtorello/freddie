export const GIT_FOLDER = './.git/hooks';

export const FREDDIE_FOLDER = './.freddie';

export const VALID_GIT_HOOKS = new Set([
	'applypatch-msg',
	'pre-applypatch',
	'post-applypatch',
	'pre-commit',
	'prepare-commit-msg',
	'commit-msg',
	'post-commit',
	'pre-rebase',
	'post-checkout',
	'post-merge',
	'pre-push',
	'update',
	'post-update',
	'pre-receive',
	'proc-receive',
	'post-receive',
	'pre-auto-gc',
	'post-rewrite',
	'sendemail-validate',
	'reference-transaction',
	'push-to-checkout',
	'post-index-change',
]);
