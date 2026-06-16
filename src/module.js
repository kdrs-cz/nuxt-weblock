import {defineNuxtModule, addPlugin, createResolver} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'nuxt-weblock',
    configKey: 'webLock'
  },

  defaults: {},

  setup(options, nuxt) {
    const {resolve} = createResolver(import.meta.url);

    if (options.isEnabled) {
      nuxt.options.runtimeConfig.public.webLock = {
        password: options.password
      };

      if(options.excludeRoutes) {
        nuxt.options.runtimeConfig.public.webLock.excludeRoutes = options.excludeRoutes
      }

      // cookieMaxAge: number of hours before the login cookie expires. Omit for a session cookie.
      if(options.cookieMaxAge != null) {
        nuxt.options.runtimeConfig.public.webLock.cookieMaxAge = options.cookieMaxAge
      }

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
