<template>
<div class="post elevation-2 p-3 row">
  <div class="d-flex align-items-center gap-2">
    <div class="col-7 d-flex align-items-center">
      <RouterLink :to="{name: 'Profile', params: {id: postProp?.creatorId}}">
      <img :src="postProp?.creator.picture" alt="account-picture" class="creatorImg" :title="`Go to ${postProp?.creator.name}'s profile page`">
    </RouterLink>
    <div class="row">
      <p class="m-0" title="Poster">{{ postProp?.creator.name }}</p>
      <p>{{ ComputeFullDate(postProp?.createdAt) }}</p>
    </div>
    </div>
    <div class="col-5 text-end">
      <button v-if="(postProp?.creatorId == account.id)" @click="removePost(postProp?.id)" class="btn btn-danger delete-btn rounded-pill me-3"><i class="mdi mdi-delete"></i></button>
      <i v-if="account.id" @click="likePost()" class="align-self-end selectable mdi mdi-snowflake text-primary">= {{ postProp?.likeIds.length }}</i>
      <i v-if="!account.id" class="align-self-end mdi mdi-snowflake text-dark"> = {{ postProp?.likeIds.length }}</i>
    </div>
  </div>
  <div class="d-flex flex-column">
    <div class="d-flex align-items-center justify-content-between"> {{ postProp?.body }}
    <img :src="postProp?.imgUrl"  alt="mmmm nice try my guy" class="img-fluid img-url" v-if="postProp?.imgUrl">
  </div>
  </div>
</div>
  <!-- <card class="post-card my-1 py-1">
    <div class="d-flex flex-column">
      <p>{{ postProp?.creator.name }}</p>
  <img class="img-fluid rounded" :src="postProp?.imgUrl" alt="">
{{ postProp?.body }}
<i class="mdi mdi-snowflake text-end">{{ postProp?.likeIds }}</i>
</div>
  </card> -->
</template>

<script>


import {AppState} from '../AppState.js';
import {Post} from '../models/Post.js';
import { postService } from "../services/PostService.js";
import { RouterLink } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { computed, reactive, onMounted} from 'vue';

export default {
  // props: {
  //   post: {
  //     type: Post,
  //     required: true
  //   },
  // },
  props: {
    postProp: {type: Post, required: true}
  },

setup(props) {
  return {
    account: computed(() => AppState.account),
    async removePost() {
      try {
        if (await Pop.confirm('lose the thing?'))
        await postService.removePost(props.postProp?.id)
        Pop.toast('Post lost! Please refresh!', 'success')
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    },
    async likePost() {
      try {
        await postService.likePost(props.postProp?.id)
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    },
    ComputeFullDate(date){
      return new Date(date).toLocaleDateString("en-us", {weekday: "long", year: "numeric", month: "short", day: "numeric"});
    },
  };
},
}


</script>

<style lang="scss" scoped>
.post {
  display: flex;
  gap: 1rem;
  border: 2px solid black;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  justify-content: space-between;
  background-color: white;
}

.img-url {
  height: 20vh;
  width: 20vw;
  border-radius: 10px;
}

.body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
}

.creatorImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
  cursor: pointer;
}

</style>