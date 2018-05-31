<template>
  <li class="item" style="background-image: url('https://picsum.photos/200/300')">
    <span class="dot"></span>
    <div class="time">FEB, 2<sup>nd</sup></div>
    <div class="hilight">
      <div class="title">comment #02</div>
      <div class="info">the best animation , the best toturials you would ever see . what about canvas ?? do you like it
        ..
      </div>
      <div class="name">- dr. ahmed -</div>
    </div>
  </li>
</template>

<script>
export default {};
</script>

<style scoped>
.item {
  height: 300px;
  position: relative;
  border-radius: 10px;
  margin: 0 0 30px 60px;
  width: calc(100% - 90px);
}

.dot {
  content: '';
  display: block;
  width: 0;
  height: 100%;
  position: absolute;
  top: 0;
  left: -28.5px;
}

.dot:before {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2d8cf0;
  border: 2px solid #fff;
  position: absolute;
  left: -6px;
  top: -10px;
}

.hilight {
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
  color: #fff;
  bottom: 0;
  right: 0;
  z-index: 1;
  padding: 10px;
  border-radius: 0 0 10px 10px;
}

.title {
  font-weight: 700;
  margin-bottom: 5px;
}

.name {
  font-style: italic;
  text-align: right;
}

.time {
  position: absolute;
  left: -100px;
  color: #fff;
  font-size: 80%;
  font-weight: bold;
  top: -16px;
}
</style>
