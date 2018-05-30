<template>
  <button form-type="submit">
    <div class="userinfo">
      <open-data class="userinfo-avatar" type="userAvatarUrl"></open-data>
      <open-data class="userinfo-nickname" type="userNickName" lang="zh_CN"></open-data>
    </div>
    <div style="background-color:#f5f5f5; height: 80rpx; "></div>
  </button>
</template>

<script>
export default {
  name: 'info',
};
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2d8cf0;
  height: 280px;
  width: 100%;
}

.userinfo-avatar {
  width: 128px;
  height: 128px;
  margin: 20px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  float: left;
  overflow: hidden;
}

.userinfo-nickname {
  color: white;
}
</style>
