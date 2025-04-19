import { stderr, stdout } from './src/helpers.ts';
import {
	ensureFreddieFolder,
	ensureWelcomeSampleHook,
} from './src/functions.ts';

const [flag] = Deno.args;

switch (flag) {
	case 'welcome': {
		await ensureFreddieFolder();
		await ensureWelcomeSampleHook();
		await stdout('Your hooks have been successfully initialized.');
		break;
	}
	default:
		await stderr('Unknown flag.');
		Deno.exit(1);
}
