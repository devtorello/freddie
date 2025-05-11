import { defaultHookNameCheck, stderr, stdout } from './src/helpers.ts';
import {
	createProxyHook,
	destroyProxyHook,
	ensureFreddieFolder,
	ensureWelcomeSampleHook,
	listHooks,
	showHookContent,
	switchHookState,
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
		await defaultHookNameCheck(hookName);
		await createProxyHook(hookName);
		await stdout('Your hook has been successfully added.');
		break;
	}
	case 'destroy': {
		const hookName = Deno.args[1];
		await defaultHookNameCheck(hookName);
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
		await defaultHookNameCheck(hookName);
		await showHookContent(hookName);
		break;
	}
	case 'sleep': {
		const hookName = Deno.args[1];
		await defaultHookNameCheck(hookName);
		await switchHookState(hookName, true);
		break;
	}
	case 'wake': {
		const hookName = Deno.args[1];
		await defaultHookNameCheck(hookName);
		await switchHookState(hookName, false);
		break;
	}
	default:
		await stderr('Unknown flag.');
		Deno.exit(1);
}
