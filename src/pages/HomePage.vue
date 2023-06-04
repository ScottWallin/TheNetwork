<template>
  <!-- <div class="container-fluid">
    <PostForm v-if="AppState.account.id" />
    <section class="row justify-content-center">
      <div v-for="p in AppState.posts" :key="p.id" class="col-md-7 col-12 p-3">
      <PostCard :post="p"/>
    </div>
    </section>
    <section class="row justify-content-center">
    </section>
    </div> -->
    <div class="row justify-content-center">
      <div class="post-card col-8 my-2" v-for="p in posts" :key="p.id">
        <div class="align-items-center">
          <div class="col-md-8" >
            <PostCard :postProp="p" />
          </div>
        </div>
      </div>
    </div>
    <div class="p-3">
      <button :disabled="!olderUrl" @click="changePage(olderUrl)" class="btn btn-light">Older</button>
      <button :disabled="!newerUrl" @click="changePage(newerUrl)" class="btn btn-light">Newer</button>
    </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { postService } from "../services/PostService.js";
import Pop from "../utils/Pop.js";
import PostCard from '../components/PostCard.vue'

export default {

  setup() {
    async function getPosts(){
    try {
      await postService.getPosts() 
    } catch (error) {
      Pop.error(error.message)
      logger.log(error)
    }
  }
  onMounted (() => {
    getPosts()
  })
    return {
      posts: computed(() => AppState.posts),
      olderUrl: computed (() => AppState.olderPageUrl),
      newerUrl: computed(() => AppState.newerPageUrl),
      async changePage(url) {
        try {
          await postService.changePage(url)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
