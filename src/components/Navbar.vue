<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <div class="mx-5">Network</div>
      </div>
    </router-link>
        <router-link class="navbar-brand d-flex" :to="{ name: 'Account' }">
        <div class="d-flex flex-column align-items-center">
          <div class="mx-5">Account</div>
        </div>
      </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
      </ul>
      <form @submit.prevent="doSearch()" class="me-5">
      <input type="text" name="query" placeholder="Search">
      <button class="btn btn-info"><i class="mdi mdi-eye"></i></button>
    </form>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { AppState } from "../AppState.js";
import Login from './Login.vue';
let router = useRouter()

function doSearch() {
  let query = window.event.target.query.value
  router.push({ name: 'Search', query: {query: query }})
}
onMounted(()=> {
  router = useRouter()
})
// export default {
//   setup() {
//     return {
//     }
//   }
//   };

  // components: { Login }
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
