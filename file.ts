import { failure, Result, success } from './result.ts';

export const checkFileExistence = async (path: string): Promise<boolean> => {
  try {
    await Deno.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

export const createFile = async (
  path: string,
  content: string,
): Promise<Result<boolean, 'FILE_ALREADY_EXISTS' | 'UNEXPECTED_ERROR'>> => {
  try {
    const fileExists = await checkFileExistence(path);
    if (fileExists) {
      return failure('FILE_ALREADY_EXISTS');
    }
    await Deno.writeFile(path, new TextEncoder().encode(content));
    return success(true);
  } catch (error) {
    return failure('UNEXPECTED_ERROR');
  }
};

export const makeFileExecutable = async (
  path: string,
): Promise<Result<boolean, 'UNEXPECTED_ERROR'>> => {
  try {
    await Deno.chmod(path, 0o755);
    return success(true);
  } catch (error) {
    return failure('UNEXPECTED_ERROR');
  }
};
