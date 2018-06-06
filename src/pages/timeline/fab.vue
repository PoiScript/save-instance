<template>
  <div class="fab" @click="navigateToSelector">
    <img class="fab-img" src="/static/icons/movie.png" >
  </div>
</template>

<script>
import { navigate } from '../../util';

export default {
  name: 'fab',

  methods: {
    navigateToSelector() {
      navigate('/pages/selector/main');
    },
  },
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
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 100;
}

.fab-img {
  width: 30px;
  height: 30px;
}
</style>
