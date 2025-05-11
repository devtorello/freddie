import { defaultHookNameCheck, stderr, stdout } from './src/helpers.ts';
import {
	createProxyHook,
	destroyProxyHook,
	ensureFreddieFolder,
	ensureWelcomeSampleHook,
	listHooks,
	showHookContent,
	switchHookState,
	uninstallFreddieHooks,
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
		await stdout('Your hook has been successfully disabled.');
		break;
	}
	case 'wake': {
		const hookName = Deno.args[1];
		await defaultHookNameCheck(hookName);
		await switchHookState(hookName, false);
		await stdout('Your hook has been successfully enabled.');
		break;
	}
	case 'bye': {
		await uninstallFreddieHooks();
		await stdout('Your Freddie hooks have been successfully uninstalled.');
		break;
	}
	default:
		await stderr('Unknown flag.');
		Deno.exit(1);
}
