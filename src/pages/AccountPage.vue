<template>
    <div class ="container-fluid">
      <div v-if="activeAccount" class="row cover-img text-primary"
      :style="`background-image: url(${activeAccount.coverImg})`">
      <div class="col-md-12 d-flex align-items-center">
        <img :src="activeAccount.picture" alt="" class="img-fluid profile-img rounded-circle">
        <div class="bg-transparent rounded p-3 ms-3">
        <h1>{{ activeAccount.name }}</h1>
        <h3>{{ activeAccount.bio }}</h3>
        </div>
      </div>
      <div class="col-md-12">
        <div class="row justify-content-around">
          <div class="col-md-5 text-end">
            <h5>{{ activeAccount.class }}</h5>
            <h5>Graduated: {{ activeAccount.graduated }}</h5>
            <h5>"{{ activeProfile.email }}""</h5>
          </div>
          <div class="col-md-5 text-start">
              <h5>{{ activeAccount.resume }}</h5>
              <h5><i class="mdi mdi-github">{{ activeAccount.github }}</i></h5>
              <h5><i class="mdi mdi-linkedin">{{ activeAccount.linkedin }}</i></h5>
          </div>
        </div>
        </div>
      </div>
      <section class="row justify-content-center">
        <div v-for="p in posts" :key="p.id" class="col-12 col-md-7 p-4">
          <PostCard :post="p" />
        </div>
      </section>
      <section class="row justify-content-center">
        <button class="col-2 btn btn-light" :disabled="!olderUrl" @click="changePage(olderUrl)">
          Older</button>
          <div class="col-2 text-center">{{ olderPageUrl }}</div>
            <button :disabled="!newerUrl" @click="changePage(newerUrl)" class="btn btn-light">
            Newer</button>
      </section>
    </div>
    <!-- STUB form stuff -->
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-8">
        <form @submit.prevent="editAccount()">
        <div class="my-2">
          <label for="name" class="form-label">Name</label>
          <input type="text" v-model="editable.name" required class="form-control" id="name">
        </div>
              <div class="my-2">
            <label for="email" class="form-label">Email</label>
            <input type="text" v-model="editable.email" required class="form-control" id="email">
          </div>
              <div class="my-2">
            <label for="class" class="form-label">Class of</label>
            <input type="text" v-model="editable.class" required class="form-control" id="class">
          </div>
              <div class="my-2">
            <label for="github" class="form-label">GitHub</label>
            <input type="text" v-model="editable.github" required class="form-control" id="github">
          </div>
              <div class="my-2">
            <label for="linkedin" class="form-label">LinkedIn</label>
            <input type="text" v-model="editable.linkedin" required class="form-control" id="linkedin">
          </div>
              <div class="my-">
            <label for="coverImg" class="form-label">Cover Image</label>
            <input type="text" v-model="editable.coverImg" required class="form-control" id="coverImg">
          </div>
              <div class="my-1">
            <label for="picture" class="form-label">Profile Picture</label>
            <input type="text" v-model="editable.picture" required class="form-control" id="picture">
          </div>
              <div class="my-1">
            <label for="bio" class="form-label">Bio</label>
            <textarea type="text" v-model="editable.bio" required class="form-control" id="bio"></textarea>
          </div>
          <button class="btn btn-success mt-2"><i class="mdi mdi-content-save pe-2"></i>Save Information</button>
      </form>
      </div>
    </div>
  </div>
  <!-- <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div> -->
</template>

<script>
import {computed, ref, watchEffect} from 'vue';
import { accountService } from "../services/AccountService.js";
import { AppState } from '../AppState';
import { postService } from "../services/PostService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
export default {
  setup() {
    const editable = ref ({})
    watchEffect(()=> {
      if (AppState.account.id) {
        editable.value = {...AppState.account}
      }
    })
    return {
      editable,
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          await accountService.editAccount(editable.value)
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
