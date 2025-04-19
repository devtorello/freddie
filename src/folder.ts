import { Result, success, failure } from './result.ts';

type CreateFolderResult = Result<boolean, 'FOLDER_ALREADY_EXISTS' | 'UNEXPECTED_ERROR'>;

export const createFolder = async (path: string): Promise<CreateFolderResult> => {
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

export const removeFolder = async (path: string): Promise<CreateFolderResult> => {
  try {
    await Deno.remove(path, { recursive: true });
    return success(true);
  } catch {
    return failure('UNEXPECTED_ERROR');
  }
};
