import {defineNuxtPlugin, addRouteMiddleware, useCookie, navigateTo, useRuntimeConfig} from '#app';

export default defineNuxtPlugin(() => {
  addRouteMiddleware('weblock-check', (to, from) => {
    const config = useRuntimeConfig();
    const excludeRoutes = config.public.webLock?.excludeRoutes || [];

    if (excludeRoutes.includes(to.path)) {
      return;
    }

    const cookieOptions = {};
    const cookieMaxAge = config.public.webLock?.cookieMaxAge;
    if (cookieMaxAge != null) {
      cookieOptions.maxAge = cookieMaxAge * 3600;
    }

    const loginCookie = useCookie('loggedIn', cookieOptions);

    if (loginCookie.value !== true && to.name !== 'WebLockPage') {
      return navigateTo('/weblock?origin=' + from.path);
    }

  }, {global: true});
});
