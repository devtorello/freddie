export const stdout = async (text: string, end = '\n'): Promise<number> => {
	return await Deno.stdout.write(new TextEncoder().encode(`${text}${end}`));
};

export const stderr = async (text: string, end = '\n'): Promise<number> => {
	return await Deno.stderr.write(new TextEncoder().encode(`${text}${end}`));
};
