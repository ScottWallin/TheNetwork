<template>
  <div class="row">
    <!-- <ProfileSearchResult v-for="p in profile" :profile="p" /> -->
    <PostCard v-for="p in posts" :posts="p" :key="p.id" />
  </div>
</template>

<script>
import { AppState } from '../AppState.js';
import { computed, reactive, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from "../utils/Pop.js";
import { postService } from '../services/PostService.js';
import PostCard from '../components/PostCard.vue';
import {profilesService} from '../services/ProfilesService.js'
import ProfileSearchResult from "../components/ProfileSearchResult.vue";

let route = useRoute()
let query = route.query
export default {
    setup() {
        // async function searchProfiles() {
        //     try {
        //         await profilesService.searchProfiles(query);
        //     }
        //     catch (error) {
        //         logger.log(error);
        //         Pop.error(error.message);
        //     }
        // }
        async function searchPosts() {
          try {
            await postService.searchPosts(query)
          } catch (error) {
            logger.log(error)
            Pop.error(error.message)
          }
        }
        onMounted(() => {
            // searchProfiles();
            searchPosts();
        });
        return {
            posts: computed(() => AppState.posts),
            profile: computed(() => AppState.profile)
        };
    },
};
</script>

<style>

</style>