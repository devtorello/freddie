import {
	DEFAULT_PRE_COMMIT_CONTENT,
	FREDDIE_FOLDER,
	GIT_FOLDER,
	PROXY_HOOK_CONTENT,
} from './consts.ts';
import { createFolder, removeFolder } from './folder.ts';
import { isError } from './result.ts';
import { stderr, stdout } from './helpers.ts';
import { createFile } from './file.ts';

export const ensureFreddieFolder = async (): Promise<void> => {
	const folderResult = await createFolder(FREDDIE_FOLDER);
	if (isError(folderResult)) {
		if (folderResult.error === 'UNEXPECTED_ERROR') {
			await stderr('Failed to create folder.');
			Deno.exit(1);
		}

		const answer = prompt(
			'Ops, it seems that the folder already exists. Do you want me to reset your folder? Give me the "yes" command in order to proceed:',
		);
		if (answer !== 'yes') {
			await stdout('Aborting.');
			Deno.exit(0);
		}

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
		DEFAULT_PRE_COMMIT_CONTENT,
		{ overwrite },
	);

	if (isError(freddieHookCreation)) {
		if (freddieHookCreation.error === 'UNEXPECTED_ERROR') {
			await stderr('Failed to create freddie hook file.');
			Deno.exit(1);
		}

		const answer = prompt(
			'Ops, it seems that the freddie hook file already exists. Do I have permission to overwrite it? Give me the "yes" command in order to proceed:',
		);
		if (answer !== 'yes') {
			await stdout('Aborting.');
			Deno.exit(0);
		}

		await ensureWelcomeSampleHook(true);
	}

	const gitHookCreation = await createFile(
		`${GIT_FOLDER}/pre-commit`,
		PROXY_HOOK_CONTENT['pre-commit'],
		{ overwrite },
	);

	if (isError(gitHookCreation)) {
		if (gitHookCreation.error === 'UNEXPECTED_ERROR') {
			await stderr('Failed to create git hook file.');
			Deno.exit(1);
		}
	}
};
