<template>

  <div class="my-1 py-1 bannerThings">
  <img :src="banner.tall" :alt="banner.title">
  </div>
 

</template>

<script>

import { Banner } from "../models/Banner.js";
export default {
props: {
  banner: {type: Banner, required: true}
}
}
</script>

<style>

</style>