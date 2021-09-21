import {app, Menu, shell} from 'electron';
import {join} from 'node:path';
import {is, appMenu, aboutMenuItem, openUrlMenuItem} from 'electron-util';
import {openInEditor, clear} from './config.js';

const showPreferences = () => {
	// Show the app's preferences here
};

const helpSubmenu = [
	openUrlMenuItem({
		label: 'Webseite',
		url: 'https://eisadler.com',
	}),
	openUrlMenuItem({
		label: 'Source Code',
		url: 'https://github.com/christianwgd/eisadler-uhr.git',
	}),
];

const __dirname = new URL('.', import.meta.url).pathname;

if (!is.macos) {
	helpSubmenu.push(
		{
			type: 'separator',
		},
		aboutMenuItem({
			icon: join(__dirname, 'static', 'icon.png'),
			text: 'Created by Your Name',
		}),
	);
}

const debugSubmenu = [
	{
		label: 'Show Settings',
		click() {
			openInEditor();
		},
	},
	{
		label: 'Show App Data',
		click() {
			shell.openItem(app.getPath('userData'));
		},
	},
	{
		type: 'separator',
	},
	{
		label: 'Delete Settings',
		click() {
			clear();
			app.relaunch();
			app.quit();
		},
	},
	{
		label: 'Delete App Data',
		click() {
			shell.moveItemToTrash(app.getPath('userData'));
			app.relaunch();
			app.quit();
		},
	},
];

const macosTemplate = [
	appMenu([
		{
			label: 'Einstellungen…',
			accelerator: 'Command+,',
			click() {
				showPreferences();
			},
		},
	]),
	{
		role: 'fileMenu',
		submenu: [
			{
				type: 'separator',
			},
			{
				role: 'close',
			},
		],
	},
	{
		role: 'viewMenu',
	},
	{
		role: 'windowMenu',
	},
	{
		role: 'help',
		submenu: helpSubmenu,
	},
];

// Linux and Windows
const otherTemplate = [
	{
		role: 'fileMenu',
		submenu: [
			{
				type: 'separator',
			},
			{
				label: 'Settings',
				accelerator: 'Control+,',
				click() {
					showPreferences();
				},
			},
			{
				type: 'separator',
			},
			{
				role: 'quit',
			},
		],
	},
	{
		role: 'viewMenu',
	},
	{
		role: 'help',
		submenu: helpSubmenu,
	},
];

const template = process.platform === 'darwin' ? macosTemplate : otherTemplate;

if (is.development) {
	template.push({
		label: 'Debug',
		submenu: debugSubmenu,
	});
}

export default Menu.buildFromTemplate(template);
