<template>
  <form @submit.prevent="submit">
    <input type="file" />
    <button type="submit">Send</button>
  </form>
</template>

<script>
export default {
  name: 'Form',
  methods: {
    async submit() {
      const file = Math.floor(Math.random() * 1048576 * 100);
      await this.$store.dispatch('makeFileSize', file);
      this.$store.dispatch('progress');
    },
  },
};
</script>
