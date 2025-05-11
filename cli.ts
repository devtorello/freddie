import { stderr, stdout } from './src/helpers.ts';
import {
	createProxyHook,
	destroyProxyHook,
	ensureFreddieFolder,
	ensureWelcomeSampleHook,
	listHooks,
	showHookContent,
} from './src/functions.ts';

const [flag] = Deno.args;

switch (flag) {
	case 'welcome': {
		await ensureFreddieFolder();
		await ensureWelcomeSampleHook();
		await stdout('Your hooks have been successfully initialized.');
		break;
	}
	case 'add': {
		const hookName = Deno.args[1];

		if (!hookName) {
			await stderr('Please, provide a hook name.');
			Deno.exit(1);
		}

		await createProxyHook(hookName);
		await stdout('Your hook has been successfully added.');
		break;
	}
	case 'destroy': {
		const hookName = Deno.args[1];

		if (!hookName) {
			await stderr('Please, provide a hook name.');
			Deno.exit(1);
		}

		await destroyProxyHook(hookName);
		await stdout('Your hook has been successfully removed.');
		break;
	}
	case 'sniff': {
		await listHooks();
		break;
	}
	case 'fetch': {
		const hookName = Deno.args[1];

		if (!hookName) {
			await stderr('Please, provide a hook name.');
			Deno.exit(1);
		}

		await showHookContent(hookName);
		break;
	}
	default:
		await stderr('Unknown flag.');
		Deno.exit(1);
}
