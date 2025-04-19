export type Success<T> = { ok: true; value: T };
export type Failure<E extends string> = { ok: false; error: E };
export type Result<T, E extends string> = Success<T> | Failure<E>;

export const success = <T>(value: T): Success<T> => ({ ok: true, value });
export const failure = <E extends string>(error: E): Failure<E> => ({
	ok: false,
	error,
});

export const isOk = <T, E extends string>(
	result: Result<T, E>,
): result is Success<T> => result.ok;
export const isError = <T, E extends string>(
	result: Result<T, E>,
): result is Failure<E> => !result.ok;
