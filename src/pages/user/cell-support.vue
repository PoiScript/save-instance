<template>
  <div class="cell">
    <button form-type="submit" hover-class="button-hover" open-type="contact">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd">
          <img class="cell-img" src="/static/icons/contact.png"/>
        </div>
        <div class="weui-cell__bd weui-cell_primary">
          <div>联系我们</div>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'cellSupport',
};
</script>

<style scoped>
.cell {
  border-bottom: 1px solid #f5f5f5;
}

.cell-img {
  float: left;
  width: 22px;
  height: 22px;
  margin-right: 5px;
}
</style>
