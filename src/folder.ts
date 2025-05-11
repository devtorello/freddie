import { stdout } from './helpers.ts';
import { failure, Result, success } from './result.ts';

type CreateFolderResult = Result<
	boolean,
	'FOLDER_ALREADY_EXISTS' | 'UNEXPECTED_ERROR'
>;

export const folderExists = async (
	path: string,
): Promise<boolean> => {
	try {
		await Deno.stat(path);
		return true;
	} catch {
		return false;
	}
};

export const createFolder = async (
	path: string,
): Promise<CreateFolderResult> => {
	try {
		await Deno.mkdir(path);
		return success(true);
	} catch (error) {
		if (error instanceof Deno.errors.AlreadyExists) {
			return failure('FOLDER_ALREADY_EXISTS');
		}
		return failure('UNEXPECTED_ERROR');
	}
};

export const removeFolder = async (
	path: string,
): Promise<CreateFolderResult> => {
	try {
		await Deno.remove(path, { recursive: true });
		return success(true);
	} catch {
		return failure('UNEXPECTED_ERROR');
	}
};

export const listFolderFiles = async (path: string): Promise<string[]> => {
	try {
		const files = Deno.readDir(path);
		const fileNames: string[] = [];
		for await (const file of files) {
			fileNames.push(file.name);
		}
		return fileNames;
	} catch {
		return [];
	}
};

export const defaultExistentFolderPrompt = async () => {
	const answer = prompt(
		'Ops, it seems that the folder already exists. Do you want me to reset your folder? Give me the "yes" command in order to proceed:',
	);
	if (answer !== 'yes') {
		await stdout('Aborting.');
		Deno.exit(0);
	}
};
