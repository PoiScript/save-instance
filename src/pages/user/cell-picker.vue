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
  props: ['img', 'title', 'onPickerChange', 'value', 'range'],
  methods: {
    change(e) {
      this.onPickerChange(e);
    },
  },
};
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
