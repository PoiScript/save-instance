<template>
  <div class="box">
    <ul>
      <item v-for="i in [1, 2, 3]" :key="i"></item>
    </ul>
  </div>
</template>

<script>
import item from './item';

export default {
  components: {
    item,
  },
};
</script>

<style scoped>
.box {
  margin: 0;
  padding: 0 0 25px 60px;
  background-color: #2d8cf0;
}

.box ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  top: 25px;
}

.box ul:before {
  content: '';
  display: block;
  width: 0;
  height: 100%;
  border: 1px solid #fff;
  position: absolute;
  top: 0;
  left: 30px;
}
</style>
