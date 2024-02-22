import {defineNuxtModule, addPlugin, createResolver} from '@nuxt/kit';
import defu from 'defu';

export default defineNuxtModule({
	meta: {
		name: 'nuxt-weblock',
		configKey: 'webLock'
	},

	defaults: {},

	setup(options, nuxt) {
		const {resolve} = createResolver(import.meta.url);

		if (options.isEnabled) {
			nuxt.options.runtimeConfig.public.webLock = defu(nuxt.options.runtimeConfig.public.webLock, {
				password: options.password
			});

			nuxt.hook('pages:extend', (pages) => {
				pages.push({
					name: 'WebLockPage',
					path: '/weblock',
					file: resolve('./runtime/pages/weblock.vue')
				});
			});

			addPlugin(resolve('./runtime/plugin'));
		}
	}
});
