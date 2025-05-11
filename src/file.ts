import { failure, isError, Result, success } from './result.ts';
import { formatItalic } from './helpers.ts';

type FileErrors =
	| 'FILE_ALREADY_EXISTS'
	| 'FILE_DOES_NOT_EXIST'
	| 'UNEXPECTED_ERROR';

interface CreateFileOptions {
	overwrite?: boolean;
}

export const checkFileExistence = async (path: string): Promise<boolean> => {
	try {
		await Deno.stat(path);
		return true;
	} catch {
		return false;
	}
};

export const makeFileExecutable = async (
	path: string,
): Promise<Result<boolean, 'UNEXPECTED_ERROR'>> => {
	try {
		await Deno.chmod(path, 0o755);
		return success(true);
	} catch {
		return failure('UNEXPECTED_ERROR');
	}
};

export const createFile = async (
	path: string,
	content: string,
	options: CreateFileOptions = { overwrite: false },
): Promise<Result<boolean, 'FILE_ALREADY_EXISTS' | 'UNEXPECTED_ERROR'>> => {
	try {
		const fileExists = await checkFileExistence(path);
		if (fileExists && !options.overwrite) {
			return failure('FILE_ALREADY_EXISTS');
		}
		await Deno.writeFile(path, new TextEncoder().encode(content));

		const makeExecutableResult = await makeFileExecutable(path);
		if (isError(makeExecutableResult)) {
			if (makeExecutableResult.error === 'UNEXPECTED_ERROR') {
				return failure('UNEXPECTED_ERROR');
			}
		}

		return success(true);
	} catch {
		return failure('UNEXPECTED_ERROR');
	}
};

export const removeFile = async (
	path: string,
): Promise<Result<boolean, 'FILE_DOES_NOT_EXIST' | 'UNEXPECTED_ERROR'>> => {
	try {
		await Deno.remove(path);
		return success(true);
	} catch (e) {
		if (e instanceof Deno.errors.NotFound) {
			return failure('FILE_DOES_NOT_EXIST');
		}
		return failure('UNEXPECTED_ERROR');
	}
};

export const showFileContent = async (
	path: string,
): Promise<Result<string, 'FILE_DOES_NOT_EXIST' | 'UNEXPECTED_ERROR'>> => {
	try {
		const content = await Deno.readTextFile(path);
		return success(content);
	} catch (e) {
		if (e instanceof Deno.errors.NotFound) {
			return failure('FILE_DOES_NOT_EXIST');
		}
		return failure('UNEXPECTED_ERROR');
	}
};

export const renameFile = async (
	oldPath: string,
	newPath: string,
): Promise<Result<boolean, 'FILE_DOES_NOT_EXIST' | 'UNEXPECTED_ERROR'>> => {
	try {
		await Deno.rename(oldPath, newPath);
		return success(true);
	} catch (e) {
		if (e instanceof Deno.errors.NotFound) {
			return failure('FILE_DOES_NOT_EXIST');
		}
		return failure('UNEXPECTED_ERROR');
	}
};

export const fileErrorsMessageMapper = (error: FileErrors): string => {
	switch (error) {
		case 'FILE_ALREADY_EXISTS':
			return `🐶 ${formatItalic('*Tilts head*')} This file already exists. Maybe fetch a new name?`;
		case 'FILE_DOES_NOT_EXIST':
			return `🐶 ${formatItalic('*Sniffs*')} I can't find that file anywhere. Did it run off?`;
		case 'UNEXPECTED_ERROR':
			return `🐶 ${formatItalic('*Whimpers*')} Something unexpected happened. Can you throw the stick again?`;
	}
};
