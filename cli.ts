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
import {
	MSG_ADD_HOOK,
	MSG_BYE,
	MSG_DEFAULT,
	MSG_DESTROY_HOOK,
	MSG_HELP,
	MSG_SLEEP,
	MSG_WAKE,
	MSG_WELCOME,
} from './src/message.ts';

const [flag] = Deno.args;

switch (flag) {
	case 'welcome': {
		await ensureFreddieFolder();
		await ensureWelcomeSampleHook();
		await stdout(MSG_WELCOME);
		break;
	}
	case 'add': {
		const hookName = Deno.args[1];
		await defaultHookNameCheck(hookName);
		await createProxyHook(hookName);
		await stdout(MSG_ADD_HOOK);
		break;
	}
	case 'destroy': {
		const hookName = Deno.args[1];
		await defaultHookNameCheck(hookName);
		await destroyProxyHook(hookName);
		await stdout(MSG_DESTROY_HOOK);
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
		await stdout(MSG_SLEEP);
		break;
	}
	case 'wake': {
		const hookName = Deno.args[1];
		await defaultHookNameCheck(hookName);
		await switchHookState(hookName, false);
		await stdout(MSG_WAKE);
		break;
	}
	case 'bye': {
		await uninstallFreddieHooks();
		await stdout(MSG_BYE);
		break;
	}
	case 'help': {
		await stdout(MSG_HELP);
		break;
	}
	default:
		await stderr(MSG_DEFAULT);
		Deno.exit(1);
}
