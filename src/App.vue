<template>
  <header>
    <Navbar />
  </header>


  <main class="container-fluid"> 
    <div class="row">
    <!-- <div class=""></div> -->
    <!-- STUB for the posts -->
    <div class="col-md-9 d-flex">
       <router-view />
    </div>
    <!-- STUB FOR THE ADS -->
    <div class="col-md-3" >
    <BannerCard v-for="b in banners"  :key="b.id" :banner="b" />
    </div>
  </div>
  </main>


   <footer class="bg-dark text-light">
    Welcome to the Network <i class="mdi mdi-smile"></i>
  </footer>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { bannersService } from "./services/BannersService.js"
import Pop from "./utils/Pop.js"

export default {
  setup() {
    async function getBanners(){
      try {
        await bannersService.getBanners()
      } catch (error) {
        Pop.error(error,'[Get the not ads]')
      }
    }
    onMounted(() =>{getBanners()
    })
    return {
      appState: computed(() => AppState),
      banners: computed(() => AppState.banners)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
body{
  background-color: #bbd8b3;
}

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
