<template>
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
</template>

<script setup>
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
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }
</style>

<style scoped>
  .weblock {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
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
    font-size: 22px;
    color: #fff;
    margin-top: 0;
    margin-bottom: 1em;
    font-weight: 500;
  }

  .weblock__input-wrap {
    display: flex;
  }

  .weblock__input {
    appearance: none;
    background-color: #eaeaff;
    font-family: inherit;
    padding: 5px 10px;
    margin: 0;
    height: 36px;
    font-size: 14px;
    border: 0;
    border-radius: 3px 0 0 3px;
    min-width: 0;
    flex: 1;
  }

  .weblock__button {
    appearance: none;
    border: 0;
    border-radius: 0 3px 3px 0;
    background-color: #232323;
    color: #fff;
    font-family: inherit;
    margin: 0;
    padding: 10px;
    height: 36px;
    font-size: 14px;
    flex: 0 0 80px;
    cursor: pointer;
  }

  .weblock__error {
    position: absolute;
    color: #D73E5E;
    margin-top: 16px;
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
