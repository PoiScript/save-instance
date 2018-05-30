<template>
  <button form-type="submit" hover-class="button-hover" open-type="contact">
    <div class="cell weui-cell weui-cell_access">
      <div class="weui-cell__hd">
        <img class="cell-img" src="/static/icons/contact.png"/>
      </div>
      <div class="weui-cell__bd weui-cell_primary">
        <div>联系我们</div>
      </div>
      <div class="weui-cell__ft weui-cell__ft_in-access"></div>
    </div>
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
.cell {
  border-top: 1px solid #d9d9d9;
}

.cell-img {
  float: left;
  width: 22px;
  height: 22px;
  margin-right: 5px;
}
</style>
