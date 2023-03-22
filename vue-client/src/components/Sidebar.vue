<template>
  <header>
    <section id="image-sidebar-container">
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
      <button v-on:click="logout" class="button">Log out</button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'sidebar-component',
  setup() {
    const { admin } = JSON.parse(localStorage.getItem('user') as string);

    const router = useRouter();

    const logout = () => {
      localStorage.clear();

      return router.push('/login');
    };

    return {
      admin,
      logout,
    };
  },
});
</script>

<style scoped>
#logo-image-sidebar {
  max-width: 90%;
}
header {
  flex-direction: column;
  align-items: center;
  display: flex;
  justify-content: space-around;
  background: #142638;
  width: 15%;
  height: 100%;
}

#image-sidebar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.panel li {
  text-align: center;
  width: 100%;
  list-style-type: none;
  margin: 0 0 10px 0;
}

.panel ul {
  padding: 0;
  margin-bottom: 400px;
}

.panel {
  width: 100%;
  font-size: 2vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
