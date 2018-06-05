<template>
  <div class="weui-panel weui-panel--padding">
    <div class="weui-panel__bd">
      <div class="weui-panel__hd">{{title}}</div>
      <div class="weui-media-box weui-media-box_small-appmsg">
        <div class="weui-cells weui-cells_in-small-appmsg">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'panel',
  props: ['title'],
};
</script>

<style scoped>
.weui-panel--padding {
  margin-top: 35px;
}
</style>
