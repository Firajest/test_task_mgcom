<template>
  <div class="progress">
    <div>{{Math.floor(this.$store.getters.getProgress)}} %</div>
    <div><button @click='click'>Cancel</button></div>
  </div>
</template>

<script>
export default {
  name: 'Progressbar',
  methods: {
    click() {
      this.$store.dispatch('cancel', 'Upload has been canceled');
    },
  },
  computed: {
    progress() {
      return this.$store.getters.getProgress;
    },
  },
};
</script>

<style scoped>
.progress {
  display: flex;
  justify-content: space-evenly;
}
</style>
