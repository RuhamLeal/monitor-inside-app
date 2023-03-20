<template>
  <form action="">
    <label for="login-user-input">
      <input id="login-user-input" type="text" placeholder="User">
    </label>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({

})
export default class LoginForm extends Vue {}
</script>
