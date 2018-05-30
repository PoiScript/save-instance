<template>
  <button form-type="submit">
    <div class="user-info">
      <open-data class="avatar" type="userAvatarUrl"></open-data>
      <open-data type="userNickName" lang="zh_CN"></open-data>
    </div>
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
.user-info {
  color: white;
  text-align: center;
  background-color: #2d8cf0;
  padding-bottom: 20px;
  width: 100%;

}

.avatar {
  width: 128px;
  height: 128px;
  padding-bottom: 20px;
  border-radius: 50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
