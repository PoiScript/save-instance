<template>
  <div class="fab" @click="onClick">
    <img class="fab-img" :src="iconImg" >
  </div>
</template>

<script>
export default {
  name: 'fab',
  props: ['onClick', 'iconImg'],
};
</script>

<style scoped>
.fab {
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 50%;
  font-size: 50px;
  text-align: center;
  line-height: 45px;
  z-index: 100;
}

.fab-img {
  width: 30px;
  height: 30px;
}
</style>
