import { expect } from 'jsr:@std/expect';
import { describe, it } from 'jsr:@std/testing/bdd';
import { stderr, stdout } from '../src/helpers.ts';

describe('helpers', () => {
	describe('stdout', () => {
		it('should return number of bytes written', async () => {
			expect(await stdout('text')).toBe(5);
		});
	});

	describe('stderr', () => {
		it('should return number of bytes written', async () => {
			expect(await stderr('error')).toBe(6);
		});
	});
});
