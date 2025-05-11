import { failure, isError, Result, success } from './result.ts';

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

export const fileErrorsMessageMapper = (error: FileErrors): string => {
	switch (error) {
		case 'FILE_ALREADY_EXISTS':
			return 'File already exists.';
		case 'FILE_DOES_NOT_EXIST':
			return 'File does not exist.';
		case 'UNEXPECTED_ERROR':
			return 'An unexpected error occurred.';
	}
};
