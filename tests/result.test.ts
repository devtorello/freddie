import { describe, it } from 'jsr:@std/testing/bdd';
import { expect } from 'jsr:@std/expect';
import { failure, isError, isOk, success } from '../src/result.ts';

describe('result', () => {
	describe('success', () => {
		it('result.ok should be true in case of success', () => {
			const result = success(1);
			expect(result.ok).toBe(true);
		});

		it('result.value should be the value in case of success', () => {
			const result = success(1);
			if (isOk(result)) {
				expect(result.value).toBe(1);
			}
		});
	});

	describe('failure', () => {
		it('result.ok should be false in case of failure', () => {
			const result = failure('error');
			expect(result.ok).toBe(false);
		});

		it('result.error should be the error in case of failure', () => {
			const result = failure('error');
			if (isError(result)) {
				expect(result.error).toBe('error');
			}
		});
	});
});
