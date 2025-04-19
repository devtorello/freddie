import { describe, it, beforeAll } from 'jsr:@std/testing/bdd';
import { createFile, checkFileExistence, makeFileExecutable } from '../file.ts';
import { expect } from 'jsr:@std/expect';
import { isError, isOk } from '../result.ts';

describe('file', () => {
  describe('check file existence', () => {
    it('should return true if the file exists', async () => {
      await Deno.writeFile('./create-file-test', new TextEncoder().encode('content'));
      const result = await checkFileExistence('./create-file-test');
      expect(result).toBeTruthy();
      await Deno.remove('./create-file-test');
    });

    it('should return false if the file does not exist', async () => {
      const result = await checkFileExistence('./create-file-test');
      expect(result).toBeFalsy();
    });
  });

  describe('create file', () => {
    it('should return true if the file is created', async () => {
      const result = await createFile('./create-file-test', 'content');
      expect(result.ok).toBeTruthy();
      if (isOk(result)) {
        expect(result.value).toBe(true);
      }
      await Deno.remove('./create-file-test');
    });

    it('should not return false and FILE_ALREADY_EXISTS if overwrite is true', async () => {
      const result = await createFile('./create-file-test', 'content', { overwrite: true });
      expect(result.ok).toBeTruthy();
      if (isOk(result)) {
        expect(result.value).toBe(true);
      }
      await Deno.remove('./create-file-test');
    });

    it('should return false and UNEXPECTED_ERROR if the file is not created', async () => {
      const result = await createFile('/path/to/does/not/exist', 'content');
      expect(result.ok).toBeFalsy();
      if (isError(result)) {
        expect(result.error).toBe('UNEXPECTED_ERROR');
      }
    });

    it('should return false and FILE_ALREADY_EXISTS if the file already exists', async () => {
      await Deno.writeFile('./create-file-test', new TextEncoder().encode('content'));
      const result = await createFile('./create-file-test', 'content');
      expect(result.ok).toBeFalsy();
      if (isError(result)) {
        expect(result.error).toBe('FILE_ALREADY_EXISTS');
      }
      await Deno.remove('./create-file-test');
    });
  });

  describe('make file executable', () => {
    it('should return true if the file is executable', async () => {
      await Deno.writeFile('./create-file-test', new TextEncoder().encode('content'));
      const result = await makeFileExecutable('./create-file-test');
      expect(result.ok).toBeTruthy();
      if (isOk(result)) {
        expect(result.value).toBe(true);
      }
      await Deno.remove('./create-file-test');
    });

    it('should return false and UNEXPECTED_ERROR if the file is not executable', async () => {
      const result = await makeFileExecutable('/path/to/does/not/exist');
      expect(result.ok).toBeFalsy();
      if (isError(result)) {
        expect(result.error).toBe('UNEXPECTED_ERROR');
      }
    });
  });
});
