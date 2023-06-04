<template>
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
