<template>
  <div class="post elevation-1 col-10 my-3 text-info ms-5">
    <div class="cover-img" :style="`background-image: url(${profile.coverImg})`">
    <div class="d-flex align-items-center">
      <div class="col-3 m-2">
        <RouterLink :to="{ name: 'Profile', params: { id: profile._id}}">
          <img class="pic-img" :src="profile.picture" alt="your face here">
        </RouterLink>
      </div>
      <div class="col-9">
        <h1>{{  profile.name }}</h1>
        <p>{{  profile.bio }}</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
    props: {
    postProp: { type: Object, required: true }
  },

}
</script>

<style scoped lang="scss">
.post {
  display: flex;
  gap: 1rem;
  border: 3px solid black;
  border-radius: 9px;
  padding: 1rem;
  box-shadow: 0 0 9px 0 rgba(0, 0, 0, 1);
  justify-content: space-between;
}

.pic-img {
  height: 20vh;
  width: 15vh vw;
  border-radius: 9px;
  object-fit: cover;
  margin-right: 1rem;
  cursor: pointer;
}
.cover-img {
  min-height: 15vh;
  width: 100%;
  background-size: cover;
  background-position: center;
}
</style>