<template>
<div class="post elevation-2 p-3 row">
  <div class="d-flex align-items-center gap-2">
    <div class="col-7 d-flex align-items-center">
      <RouterLink :to="{name: 'Profile', params: {id: post.creatorId}}">
      <img :src="post.creator.picture" alt="account-picutre" class="creatorImg" :title="`Go to ${post.creator.name}'s profile page`">
    </RouterLink>
    <div class="row">
      <p class="m-0" title="Poster">{{ post.creator.name }}</p>
      <p>{{ ComputeFullDate(post.createdAt) }}</p>
    </div>
    </div>
    <div class="col-5 text-end">
      <button v-if="(post.creatorId == account.id)" @click="removePost(post.id)" class="btn btn-danger delete-btn rounded-pill me-3"><i class="mdi mdi-delete"></i></button>
      <i v-if="account.id" @click="likePost()" class="align-self-end selectable mdi mdi-snowflake text-primary">= {{ post.likeIds.length }}</i>
      <i v-if="!account.id" class="align-self-end mdi mdi-snowflake text-dark"> = {{ post.likeIds.length }}</i>
    </div>
  </div>
  <div class="d-flex flex-column">
    <div class="d-flex align-items-center justify-content-between"> {{ post.body }}
    <img :src="post.imgUrl"  alt="mmmm nice try my guy" class="img-fluid img-url" v-if="post.imgUrl">
  </div>
  </div>
</div>
  <!-- <card class="post-card my-1 py-1">
    <div class="d-flex flex-column">
  <img class="img-fluid rounded" :src="postProp?.imgUrl" alt="">
{{ postProp?.body }}
<i class="mdi mdi-snowflake text-end">{{ postProp?.likeIds }}</i>
</div>
  </card> -->
</template>

<script>

import { setgroups } from "process";
import {AppState} from '../AppState.js';
import {Post} from '../models/Post.js';
import { postService } from "../services/PostService.js";
import { RouterLink } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { computed, reactive, onMounted} from 'vue';

export default {
  props: {
    postProp: {type: Post, required: true}
  },

setup(props) {
  return {
    account: computed(() => AppState.account),
    async removePost() {
      try {
        await postService.removePost(props.post.id)
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    },
    async likePost() {
      try {
        await postService.likePost(props.post.id)
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

<style>
.post-card{
  width: 50vw;
  background-color: white;
}

</style>