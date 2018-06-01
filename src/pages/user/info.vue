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
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2d8cf0;
  width: 100%;
  color: white;
  padding-bottom: 20px;
}

.avatar {
  width: 75px;
  height: 75px;
  margin: 15px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  float: left;
  overflow: hidden;
}
</style>
