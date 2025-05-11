import { formatItalic } from './helpers.ts';

// Dog-themed Freddie CLI messages
export const MSG_FREDDIE_FOLDER_MISSING = `🐶 ${
	formatItalic('*Looks confused*')
} The Freddie folder is missing! Try running "freddie welcome" so I can find my home!`;
export const MSG_INVALID_HOOK_NAME = `🐶 ${
	formatItalic('*Cocks head*')
} That doesn’t seem like a real hook name. Can you throw me a valid one?`;
export const MSG_CREATE_FREDDIE_HOOK_FAIL = `🐶 ${
	formatItalic('*Chases tail*')
} Couldn’t create the Freddie hook file. Let’s try again!`;
export const MSG_CREATE_GIT_HOOK_FAIL = `🐶 ${
	formatItalic('*Chases tail*')
} Couldn’t create the git hook file. Let’s try again!`;
export const MSG_ALREADY_SNOOZING = `🐶 ${
	formatItalic('*Naps*')
} That hook is already snoozing or doesn’t exist. Nothing to do!`;
export const MSG_ALREADY_RUNNING = `🐶 ${
	formatItalic('*Barks*')
} That hook is already up and running, or doesn’t exist!`;
export const MSG_NO_HOOKS_FOUND = `🐶 ${
	formatItalic('*Sniffs around*')
} I couldn't find any hooks. Maybe toss me a stick to fetch?`;
export const MSG_HOOKS_HEADER = `🐶 ${
	formatItalic('*Wags tail*')
} Here are the hooks I found for you:`;
export const MSG_SHOW_HOOK_CONTENT = `🐶 ${
	formatItalic('*Drops paper at your feet*')
} Here’s your hook’s content!`;
export const MSG_UNINSTALL_FAIL = `🐶 ${
	formatItalic('*Whines*')
} Oops, something went wrong while packing up my toys. Couldn’t uninstall everything!`;
export const MSG_UNINSTALL_PARTIAL = `🐶 ${
	formatItalic('*Whimpers*')
} I tried my best, but some hooks might still be hiding. Want to try again?`;
export const MSG_WELCOME = `🐶 ${
	formatItalic('Woof woof!')
} Hi there, new friend!\n🐾 Your Freddie library is all set up and ready to fetch some code, I just buried a shiny new pre-commit hook for you too.`;
export const MSG_ADD_HOOK = `🐶 ${
	formatItalic('*Wags tail*')
} I just fetched and added your new hook!`;
export const MSG_DESTROY_HOOK = `🐶 ${
	formatItalic('*Grrrr*')
} I’ve dug up and removed that hook for you!`;
export const MSG_SLEEP = `🐶 ${
	formatItalic('*Plops down*')
} That hook is now taking a nap.`;
export const MSG_WAKE = `🐶 ${
	formatItalic('*Perks up ears*')
} That hook is wide awake and ready to fetch some code!`;
export const MSG_BYE = `🐶 ${
	formatItalic('*Waves paw*')
} Friend, my things are packed up. Guess it is time to leave, see ya!`;
export const MSG_DEFAULT = `🐶 ${
	formatItalic('Arf?')
} I don't recognize that command. If you need help, try "freddie help" 🦴`;
export const MSG_HELP = `🐶 Here are the commands I know:
\t- ${formatItalic('add')}: Adds a new hook to your Freddie library;
\t- ${formatItalic('destroy')}: Removes a hook from your Freddie library;
\t- ${formatItalic('list')}: Lists all hooks in your Freddie library;
\t- ${formatItalic('show')}: Shows the content of a hook;
\t- ${formatItalic('sleep')}: Suspends a hook;
\t- ${formatItalic('wake')}: Resumes a hook;
\t- ${formatItalic('uninstall')}: Uninstalls Freddie from your system;
\t- ${formatItalic('welcome')}: Installs Freddie to your system.`;
