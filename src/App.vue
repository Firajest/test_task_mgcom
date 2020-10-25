<template>
  <div id="app">
    <div class="message" v-if="message!==''" >
      <span><strong>{{message}}</strong></span>
      <button type="button" @click="(event)=>close(event)">Close message</button>
    </div>
      <hr>
    <Form v-if="!uploadStatus" />
    <Progressbar v-else />
  </div>
</template>

<script>
import Form from './components/Form.vue';
import Progressbar from './components/Progressbar.vue';

export default {
  name: 'App',
  components: {
    Form,
    Progressbar,
  },
  computed: {
    uploadStatus() {
      return this.$store.getters.getUploadStatus;
    },
    message() {
      return this.$store.getters.getResultStatus;
    },
  },
  methods: {
    close(event) {
      event.target.parentElement.setAttribute('class', 'hidden');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.hidden {
  display: none;
}
.message {
  display: flex;
  justify-content:space-around;
}
</style>
