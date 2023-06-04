<template>
  <section class="row justify-content-center mt-3">
    <div class="col-5 card p-3">
      <form @submit.prevent="createPost()" class="row justify-content-center">
      <div class="form-group">
        <label for="body"></label>
        <input type="text" class="form-control" required name="body" placeholder="What's going on?">
      </div>
    <div class="form-group">
      <label for="imgUrl"></label>
      <input type="url" class="form-control" id="imgUrl" name="imgUrl" placeholder="Show us the goods">
    </div>
    <button class="btn btn-info w-25 rounded mt-2 p-1">Create Post</button>
  </form>
    </div>
  </section>
</template>

<script>
import {AppState} from '../AppState.js'
import { postService } from "../services/PostService.js"
import Pop from "../utils/Pop.js"
import {logger} from '../utils/Logger.js'

export default {
setup() {
  return {
  async createPost() {
    try {
      let form = event.target
      let rawPost = {
        body: form.body.value,
        imgUrl: form.imgUrl.value
      }
      await postService.createPost(rawPost)
      Pop.toast('Post made!', 'success')
      form.reset()
    } catch (error) {
      logger.error(error)
      Pop.error(error)
    }
  }
}
}
}
</script>

<style>

</style>