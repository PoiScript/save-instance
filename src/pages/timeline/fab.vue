<template>
  <div class="fab"> + </div>
</template>

<script>
export default {
  name: 'fab',
};
</script>

<style scoped>
.fab {
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 50%;
  font-size: 50px;
  color: white;
  text-align: center;
  line-height: 45px;
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 100;
}
</style>
