import {defineNuxtPlugin, addRouteMiddleware, useCookie} from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    const date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

    useCookie('loggedIn', {
      default: () => ('false'),
      expires: date
    });
  });

  addRouteMiddleware('weblock-check', (to) => {
    const loginCookie = useCookie('loggedIn');

    if (loginCookie.value === false && to.name !== 'WebLockPage') {
      return navigateTo('/weblock');
    }
  }, {global: true});
});
