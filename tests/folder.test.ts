import { describe, it } from 'jsr:@std/testing/bdd';
import { expect } from 'jsr:@std/expect';
import { createFolder, removeFolder } from '../src/folder.ts';
import { isError, isOk } from '../src/result.ts';

describe('folder', () => {
	describe('create folder', () => {
		it('should return true if the folder is created', async () => {
			const result = await createFolder('./create-folder-test');
			expect(result.ok).toBe(true);
			if (isOk(result)) {
				expect(result.value).toBe(true);
			}
		});

		it('should return false and UNEXPECTED_ERROR if the folder is not created', async () => {
			const result = await createFolder('/path/to/does/not/exist');
			expect(result.ok).toBe(false);
			if (isError(result)) {
				expect(result.error).toBe('UNEXPECTED_ERROR');
			}
		});

		it('should return false and FOLDER_ALREADY_EXISTS if the folder already exists', async () => {
			const result = await createFolder('./create-folder-test');
			expect(result.ok).toBe(false);
			if (isError(result)) {
				expect(result.error).toBe('FOLDER_ALREADY_EXISTS');
			}
			await Deno.remove('./create-folder-test');
		});
	});

	describe('remove folder', () => {
		it('should return true if the folder is removed', async () => {
			await Deno.mkdir('./remove-folder-test');
			const result = await removeFolder('./remove-folder-test');
			expect(result.ok).toBe(true);
			if (isOk(result)) {
				expect(result.value).toBe(true);
			}
		});

		it('should return false and UNEXPECTED_ERROR if the folder is not removed', async () => {
			const result = await removeFolder('/path/to/does/not/exist');
			expect(result.ok).toBe(false);
			if (isError(result)) {
				expect(result.error).toBe('UNEXPECTED_ERROR');
			}
		});
	});
});
