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
			await stderr('Failed to create folder.');
			Deno.exit(1);
		}

		await defaultExistentFolderPrompt();

		const removeResult = await removeFolder(FREDDIE_FOLDER);
		if (isError(removeResult)) {
			if (removeResult.error === 'UNEXPECTED_ERROR') {
				await stderr('Failed to reset folder.');
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
			await stderr('Failed to create freddie hook file.');
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
			await stderr('Failed to create git hook file.');
			Deno.exit(1);
		}
	}
};

export const createProxyHook = async (
	hookName: string,
	overwrite = false,
): Promise<void> => {
	if (!await folderExists(FREDDIE_FOLDER)) {
		await stderr(
			'Freddie folder does not exist. Please, run "freddie welcome" first!',
		);
		Deno.exit(1);
	}

	if (!VALID_GIT_HOOKS.has(hookName)) {
		await stderr('Invalid hook name. Try again, please.');
		Deno.exit(1);
	}

	const freddieHookCreation = await createFile(
		`${FREDDIE_FOLDER}/${hookName}`,
		defaultFreddieHookContent(hookName),
		{ overwrite },
	);

	if (isError(freddieHookCreation)) {
		if (freddieHookCreation.error === 'UNEXPECTED_ERROR') {
			await stderr('Failed to create freddie hook file.');
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
			await stderr('Failed to create git hook file.');
			Deno.exit(1);
		}
	}
};

export const destroyProxyHook = async (hookName: string): Promise<void> => {
	if (!await folderExists(FREDDIE_FOLDER)) {
		await stderr(
			'Freddie folder does not exist. Please, run "freddie welcome" first!',
		);
		Deno.exit(1);
	}

	if (!VALID_GIT_HOOKS.has(hookName)) {
		await stderr('Invalid hook name. Try again, please.');
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

	await stdout('Your hook has been successfully removed.');
};

export const listHooks = async () => {
	const hooks = await listFolderFiles(FREDDIE_FOLDER);
	if (hooks.length === 0) {
		await stdout('No hooks found.');
		return;
	}
	await stdout('Your hooks:');
	await stdout(hooks.map((hook) => `\t- ${hook}`).join('\n'));
};

export const showHookContent = async (hookName: string): Promise<void> => {
	if (!VALID_GIT_HOOKS.has(hookName)) {
		await stderr('Invalid hook name. Try again, please.');
		Deno.exit(1);
	}

	const hookContent = await showFileContent(`${FREDDIE_FOLDER}/${hookName}`);
	if (isError(hookContent)) {
		const error = fileErrorsMessageMapper(hookContent.error);
		await stderr(error);
		Deno.exit(1);
	}

	await stdout('Here is your hook content:');

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
		await stderr('Invalid hook name. Try again, please.');
		Deno.exit(1);
	}

	if (shouldDisable) {
		const renameResult = await renameFile(
			`${FREDDIE_FOLDER}/${hookName}`,
			`${FREDDIE_FOLDER}/.${hookName}`,
		);

		if (isError(renameResult)) {
			if (renameResult.error === 'FILE_DOES_NOT_EXIST') {
				await stderr('Hook does not exist or it is already disabled.');
				Deno.exit(1);
			}

			const error = fileErrorsMessageMapper(renameResult.error);
			await stderr(error);
			Deno.exit(1);
		}

		await stdout('Your hook has been disabled.');
		return;
	}

	const renameResult = await renameFile(
		`${FREDDIE_FOLDER}/.${hookName}`,
		`${FREDDIE_FOLDER}/${hookName}`,
	);

	if (isError(renameResult)) {
		if (renameResult.error === 'FILE_DOES_NOT_EXIST') {
			await stderr('Hook does not exist or it is already enabled.');
			Deno.exit(1);
		}

		const error = fileErrorsMessageMapper(renameResult.error);
		await stderr(error);
		Deno.exit(1);
	}

	await stdout('Your hook has been enabled.');
	return;
};
