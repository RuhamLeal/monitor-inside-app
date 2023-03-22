<template>
  <header>
    <section>
      <img id="logo-image-sidebar" alt="logo" src="../assets/logo.png">
    </section>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/starti/dashboard" class="link">
            Dashboard
          </router-link>
        </li>
        <li v-if="admin">
          <router-link to="/starti/users" class="link">
            Usuarios
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="has-text-centered">
      <button class="button">Log out</button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'sidebar-component',
  setup() {
    const admin = JSON.parse(localStorage.getItem('user') as string);

    return {
      admin,
    };
  },
});
</script>

<style scoped>
#logo-image-sidebar {
  max-width: 90%;
}
header {
  background: #142638;
  width: 15%;
  height: 100%;
}
.panel li {
  list-style-type: none;
  margin: 8px 0;
}
.link {
  text-decoration: none;
  color: #ffffff;
}
.link:hover {
  color: #8196ad;
}
.link.router-link-active {
  font-weight: 600;
  color: #b6d7fa;
}
</style>
