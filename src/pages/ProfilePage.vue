<template>
  <div class ="container-fluid">
    <div v-if="activeProfile" class="row cover-img text-primary"
    :style="`background-image: url(${activeProfile.coverImg})`">
    <div class="col-md-12 d-flex align-items-center">
      <img :src="activeProfile.picture" alt="" class="img-fluid profile-img rounded-circle">
      <div class="bg-transparent rounded p-3 ms-3">
      <h1>{{ activeProfile.name }}</h1>
      <h3>{{ activeProfile.bio }}</h3>
      </div>
    </div>
    <div class="col-md-12">
      <div class="row justify-content-around">
        <div class="col-md-5 text-end">
          <h5>{{ activeProfile.class }}</h5>
          <h5>Graduated: {{ activeProfile.graduated }}</h5>
          <h5>"{{ activeProfile.email }}""</h5>
        </div>
        <div class="col-md-5 text-start">
            <h5>{{ activeProfile.resume }}</h5>
            <h5><i class="mdi mdi-github">{{ activeProfile.github }}</i></h5>
            <h5><i class="mdi mdi-linkedin">{{ activeProfile.linkedin }}</i></h5>
        </div>
      </div>
      </div>
    </div>
    <section class="row justify-content-center">
      <div v-for="p in posts" :key="p.id" class="col-12 col-md-7 p-4">
        <PostCard :postProp="p" />
      </div>
    </section>
    <!-- <section class="row justify-content-center">
      <button class="col-2 btn btn-light" :disabled="!olderUrl" @click="changePage(olderUrl)">
        Older</button>
        <div class="col-2 text-center">{{ olderPageUrl }}</div>
          <button :disabled="!newerUrl" @click="changePage(newerUrl)" class="btn btn-light">
          Newer</button>
    </section> -->
  </div>
</template>

<script>
import { AppState } from "../AppState.js";
import {computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { profilesService } from "../services/ProfilesService.js";
import { postService } from "../services/PostService.js";
import PostCard from "../components/PostCard.vue";



export default {
    setup() {
        const route = useRoute();
        async function getProfileById() {
            try {
                await profilesService.getProfileById(route.params.id);
            }
            catch (error) {
                logger.error(error);
                Pop.error(error.message);
            }
        }
        // async function getPostsByCreatorId() {
        //   try {
        //     await postService.getPostsByCreatorId(route.params.id)
        //   } catch (error) {
        //     logger.log(error)
        //     Pop.error(error.message)
        //   }
        // }
        async function getPostsByCreatorId() {
            try {
                await postService.getPostsByCreatorId(route.params.id);
            }
            catch (error) {
                Pop.error(error.message);
                logger.log(error);
            }
        }
        onMounted(() => {
            getProfileById();
            getPostsByCreatorId();
        });
        return {
            posts: computed(() => AppState.posts),
            olderUrl: computed(() => AppState.olderPageUrl),
            newerUrl: computed(() => AppState.newerPageUrl),
            activeProfile: computed(() => AppState.activeProfile),
            async changePage(url) {
                try {
                    await postService.changePage(url);
                }
                catch (error) {
                    Pop.error(error);
                }
            }
        };
    },
    components: { PostCard }
}
</script>

<style scoped lang="scss">
.profile-img{
  height: 30vh;
  width: 35vh;
}
.cover-img{
  min-height: 50vh;
  background-size: cover;
  background-position: center;
}
</style>