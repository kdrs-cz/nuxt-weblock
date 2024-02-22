export default defineNuxtConfig({
	modules: [
		'../src/module'
	],

	webLock: {
		password: '123456',
		isEnabled: true
	},

	devtools: {
		enabled: true
	}
});
