import { FREDDIE_FOLDER, GIT_FOLDER, VALID_GIT_HOOKS } from './consts.ts';
import {
	createFolder,
	defaultExistentFolderPrompt,
	folderExists,
	listFolderFiles,
	removeFolder,
} from './folder.ts';
import { isError } from './result.ts';
import {
	defaultExistentHookPrompt,
	defaultFreddieHookContent,
	defaultGitHookContent,
	formatItalic,
	indent,
	stderr,
	stdout,
} from './helpers.ts';
import {
	MSG_ALREADY_RUNNING,
	MSG_ALREADY_SNOOZING,
	MSG_CREATE_FREDDIE_HOOK_FAIL,
	MSG_CREATE_GIT_HOOK_FAIL,
	MSG_FREDDIE_FOLDER_MISSING,
	MSG_HOOKS_HEADER,
	MSG_INVALID_HOOK_NAME,
	MSG_NO_HOOKS_FOUND,
	MSG_SHOW_HOOK_CONTENT,
	MSG_UNINSTALL_FAIL,
	MSG_UNINSTALL_PARTIAL,
} from './message.ts';

import {
	createFile,
	fileErrorsMessageMapper,
	removeFile,
	renameFile,
	showFileContent,
} from './file.ts';

export const ensureFreddieFolder = async (): Promise<void> => {
	const folderResult = await createFolder(FREDDIE_FOLDER);
	if (isError(folderResult)) {
		if (folderResult.error === 'UNEXPECTED_ERROR') {
			await stderr(MSG_FREDDIE_FOLDER_MISSING);
			Deno.exit(1);
		}

		await defaultExistentFolderPrompt();

		const removeResult = await removeFolder(FREDDIE_FOLDER);
		if (isError(removeResult)) {
			if (removeResult.error === 'UNEXPECTED_ERROR') {
				await stderr(MSG_FREDDIE_FOLDER_MISSING);
				Deno.exit(1);
			}
		}

		await ensureFreddieFolder();
	}
};

export const ensureWelcomeSampleHook = async (
	overwrite = false,
): Promise<void> => {
	const freddieHookCreation = await createFile(
		`${FREDDIE_FOLDER}/pre-commit`,
		defaultFreddieHookContent('pre-commit'),
		{ overwrite },
	);

	if (isError(freddieHookCreation)) {
		if (freddieHookCreation.error === 'UNEXPECTED_ERROR') {
			await stderr(MSG_CREATE_FREDDIE_HOOK_FAIL);
			Deno.exit(1);
		}

		await defaultExistentHookPrompt();
		await ensureWelcomeSampleHook(true);
	}

	const gitHookCreation = await createFile(
		`${GIT_FOLDER}/pre-commit`,
		defaultGitHookContent('pre-commit'),
		{ overwrite },
	);

	if (isError(gitHookCreation)) {
		if (gitHookCreation.error === 'UNEXPECTED_ERROR') {
			await stderr(MSG_CREATE_GIT_HOOK_FAIL);
			Deno.exit(1);
		}
	}
};

export const createProxyHook = async (
	hookName: string,
	overwrite = false,
): Promise<void> => {
	if (!await folderExists(FREDDIE_FOLDER)) {
		await stderr(MSG_FREDDIE_FOLDER_MISSING);
		Deno.exit(1);
	}

	if (!VALID_GIT_HOOKS.has(hookName)) {
		await stderr(MSG_INVALID_HOOK_NAME);
		Deno.exit(1);
	}

	const freddieHookCreation = await createFile(
		`${FREDDIE_FOLDER}/${hookName}`,
		defaultFreddieHookContent(hookName),
		{ overwrite },
	);

	if (isError(freddieHookCreation)) {
		if (freddieHookCreation.error === 'UNEXPECTED_ERROR') {
			await stderr(MSG_CREATE_FREDDIE_HOOK_FAIL);
			Deno.exit(1);
		}

		await defaultExistentHookPrompt();
		await createProxyHook(hookName, true);
	}

	const gitHookCreation = await createFile(
		`${GIT_FOLDER}/${hookName}`,
		defaultGitHookContent(hookName),
		{ overwrite },
	);

	if (isError(gitHookCreation)) {
		if (gitHookCreation.error === 'UNEXPECTED_ERROR') {
			await stderr(MSG_CREATE_GIT_HOOK_FAIL);
			Deno.exit(1);
		}
	}
};

export const destroyProxyHook = async (hookName: string): Promise<void> => {
	if (!await folderExists(FREDDIE_FOLDER)) {
		await stderr(MSG_FREDDIE_FOLDER_MISSING);
		Deno.exit(1);
	}

	if (!VALID_GIT_HOOKS.has(hookName)) {
		await stderr(MSG_INVALID_HOOK_NAME);
		Deno.exit(1);
	}

	const freddieHookRemoval = await removeFile(`${FREDDIE_FOLDER}/${hookName}`);
	if (isError(freddieHookRemoval)) {
		const error = fileErrorsMessageMapper(freddieHookRemoval.error);
		await stderr(error);
		Deno.exit(1);
	}

	const gitHookRemoval = await removeFile(`${GIT_FOLDER}/${hookName}`);
	if (isError(gitHookRemoval)) {
		const error = fileErrorsMessageMapper(gitHookRemoval.error);
		await stderr(error);
		Deno.exit(1);
	}
};

export const listHooks = async () => {
	const hooks = await listFolderFiles(FREDDIE_FOLDER);
	if (hooks.length === 0) {
		await stdout(MSG_NO_HOOKS_FOUND);
		return;
	}
	await stdout(MSG_HOOKS_HEADER);
	await stdout(hooks.map((hook) => `\t- ${hook}`).join('\n'));
};

export const showHookContent = async (hookName: string): Promise<void> => {
	if (!VALID_GIT_HOOKS.has(hookName)) {
		await stderr(MSG_INVALID_HOOK_NAME);
		Deno.exit(1);
	}

	const hookContent = await showFileContent(`${FREDDIE_FOLDER}/${hookName}`);
	if (isError(hookContent)) {
		const error = fileErrorsMessageMapper(hookContent.error);
		await stderr(error);
		Deno.exit(1);
	}

	await stdout(MSG_SHOW_HOOK_CONTENT);

	const splitContent = hookContent.value.split('\n');
	const formattedContent = splitContent.map((line) => {
		const italicLine = formatItalic(line);
		return indent(italicLine);
	}).join('\n');

	await stdout(formattedContent);
};

export const switchHookState = async (
	hookName: string,
	shouldDisable: boolean,
): Promise<void> => {
	if (!VALID_GIT_HOOKS.has(hookName)) {
		await stderr(MSG_INVALID_HOOK_NAME);
		Deno.exit(1);
	}

	if (shouldDisable) {
		const renameResult = await renameFile(
			`${FREDDIE_FOLDER}/${hookName}`,
			`${FREDDIE_FOLDER}/.${hookName}`,
		);

		if (isError(renameResult)) {
			if (renameResult.error === 'FILE_DOES_NOT_EXIST') {
				await stderr(MSG_ALREADY_SNOOZING);
				Deno.exit(1);
			}

			const error = fileErrorsMessageMapper(renameResult.error);
			await stderr(error);
			Deno.exit(1);
		}
	}

	const renameResult = await renameFile(
		`${FREDDIE_FOLDER}/.${hookName}`,
		`${FREDDIE_FOLDER}/${hookName}`,
	);

	if (isError(renameResult)) {
		if (renameResult.error === 'FILE_DOES_NOT_EXIST') {
			await stderr(MSG_ALREADY_RUNNING);
			Deno.exit(1);
		}

		const error = fileErrorsMessageMapper(renameResult.error);
		await stderr(error);
		Deno.exit(1);
	}
};

export const uninstallFreddieHooks = async (): Promise<void> => {
	const removeResult = await removeFolder(FREDDIE_FOLDER);
	if (isError(removeResult)) {
		if (removeResult.error === 'UNEXPECTED_ERROR') {
			await stderr(MSG_UNINSTALL_FAIL);
			Deno.exit(1);
		}
	}

	const gitHooks = await listFolderFiles(GIT_FOLDER);
	const gitHooksToRemove = gitHooks
		.filter((hook) => !hook.endsWith('.sample'))
		.map((hook) => removeFile(`${GIT_FOLDER}/${hook}`));

	const results = await Promise.all(gitHooksToRemove);
	const errors = results.filter((r) => !r.ok);

	if (errors.length > 0) {
		await stderr(MSG_UNINSTALL_PARTIAL);
		Deno.exit(1);
	}
};
