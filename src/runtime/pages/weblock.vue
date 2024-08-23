<template>
  <div class="weblock-wrap">
    <div class="weblock">
      <form
        class="weblock__form"
        @submit.prevent="login"
      >
        <h1 class="weblock__title">
          This website is locked.
        </h1>

        <div class="weblock__input-wrap">
          <input
            v-model="password"
            type="password"
            class="weblock__input"
          >

          <button class="weblock__button">
            Unlock
          </button>
        </div>

        <transition>
          <div
            v-show="isWrongPassword"
            class="weblock__error"
          >
            The password you entered is incorrect.
          </div>
        </transition>
      </form>
    </div>
  </div>
</template>

<script setup>
  import {ref, onMounted} from 'vue';
  import {useRuntimeConfig, useCookie, navigateTo, useRoute} from '#app';

  const route = useRoute();
  const config = useRuntimeConfig();
  const password = ref();

  const loginCookie = useCookie('loggedIn');
  const isWrongPassword = ref(false);

  const login = async () => {
    if (password.value === config.public.webLock.password) {
      loginCookie.value = 'true';

      await navigateTo('/');
    } else {
      isWrongPassword.value = true;
    }
  };

  onMounted(async () => {
    if(loginCookie.value && route?.query?.origin) {
      await navigateTo(route.query.origin);
    }
  });
</script>

<style>
body{padding:0;margin:0}
</style>

<style scoped>
  .weblock {
    position: fixed;
    inset: 0;
    z-index: 100000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
    background: linear-gradient(45deg, #141E30, #243B55);
  }

  .weblock * {
    box-sizing: border-box;
  }

  .weblock__form {
    position: relative;
    width: 100%;
    max-width: 320px;
    font-family: Helvetica, Arial, sans-serif;
  }

  .weblock__title {
    margin-top: 0;
    margin-bottom: 1em;
    font-size: 22px;
    font-weight: 500;
    color: #ffffff;
  }

  .weblock__input-wrap {
    display: flex;
  }

  .weblock__input {
    flex: 1;
    min-width: 0;
    height: 36px;
    padding: 5px 10px;
    margin: 0;
    font-family: inherit;
    font-size: 14px;
    appearance: none;
    background-color: #eaeaff;
    border: 0;
    border-radius: 3px 0 0 3px;
  }

  .weblock__button {
    flex: 0 0 80px;
    height: 36px;
    padding: 10px;
    margin: 0;
    font-family: inherit;
    font-size: 14px;
    color: #ffffff;
    appearance: none;
    cursor: pointer;
    background-color: #232323;
    border: 0;
    border-radius: 0 3px 3px 0;
  }

  .weblock__error {
    position: absolute;
    margin-top: 16px;
    color: #D73E5E;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
