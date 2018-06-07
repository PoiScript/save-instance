<template>
  <div class="cell">
    <div class="weui-cell weui-cell_access">
      <div class="weui-cell__hd">
        <img class="cell-img" :src="img"/>
      </div>
      <div class="weui-cell__bd weui-cell_primary">
        <div>{{text}}</div>
      </div>
      <div class="weui-cell__ft weui-cell__ft_in-access"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cellButton',
  props: ['img', 'text'],
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
