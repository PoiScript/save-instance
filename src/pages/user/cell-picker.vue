<template>
  <picker @change="change" :value="value" :range="range">
    <button form-type="submit" hover-class="button-hover">
      <div class="weui-cell weui-cell_access cell">
        <div class="weui-cell__hd">
          <img class="cell-img" v-bind:src="img"/>
        </div>
        <div class="weui-cell__bd weui-cell_primary">
          <div>{{title}}</div>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access">{{range[value]}}</div>
      </div>
    </button>
  </picker>
</template>

<script>
export default {
  name: 'cellPicker',
  props: ['img', 'title', 'onPickerChange', 'value', 'range'],
  methods: {
    change(e) {
      this.onPickerChange(e.mp.detail.value);
    },
  },
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
