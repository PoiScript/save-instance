<template>
  <div class="userbackground">
    <div class="textBody">
      <textarea class="text" :value="descr" @input="updateDescr" placeholder="字幕"
                placeholder-style="color:gray"
                cursor-spacing="0"></textarea>
      <div class="weui-textarea-counter counter">{{wordCount}}</div>
    </div>
    <photo></photo>
    <location></location>
    <submit></submit>
  </div>
</template>

<script>
import location from './location';
import photo from './photo';
import submit from './submit';
import store from './store';

export default {
  components: {
    location,
    photo,
    submit,
  },

  computed: {
    descr() {
      return store.state.descr;
    },
    wordCount() {
      return store.getters.wordCount;
    },
  },

  methods: {
    updateDescr(e) {
      store.commit('setDescr', e.target.value);
    },
  },
};
</script>

<style>
.counter {
  margin-right: 15px;
}

.userbackground {
  background-color: #ffffff;
  height: 100%;
  width: 375px;
  position: absolute;
  overflow-x: hidden;
  display: block;
}

.text {
  overflow-y: hidden;
  overflow-x: hidden;
  height: 100px;
  margin-left: 21px;
  width: 335px;
}

.textBody {
  display: block;
  position: relative;
  width: 100%;
  margin-top: 25px;
}

button,
button::after {
  margin-left: 0;
  margin-right: 0;
  padding: 0;
  box-sizing: unset;
  border: none;
  border-radius: 0;
  background-color: transparent;
  text-align: left;
  line-height: 1.5;
  -webkit-tap-highlight-color: transparent;
}

.button-lines {
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
}
</style>
