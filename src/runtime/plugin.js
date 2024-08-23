import {defineNuxtPlugin, addRouteMiddleware, useCookie, navigateTo} from '#app';

export default defineNuxtPlugin(() => {
  addRouteMiddleware('weblock-check', (to, from) => {
    let loginCookie = useCookie('loggedIn'); 

    if (process.client) {
      if(loginCookie.value === undefined) {
        const date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    
        loginCookie = useCookie('loggedIn', {
          default: () => (false),
          expires: date
        });
      } 
    }   

    if (loginCookie.value !== true && to.name !== 'WebLockPage') {
      return navigateTo('/weblock?origin=' + from.path);
    }
   
  }, {global: true});
});
