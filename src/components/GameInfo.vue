<template>
  <div class="game-info">
    <h3>Memory Matrix</h3>
    <div class="game-info__actions">
      <button @click="restartGame">
        New game
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GameInfo',
  methods: {
    restartGame() {
      this.$store.dispatch('restartGame');
    },
  },
};

</script>

<style lang="scss">
  .game-info {
    margin: 2em auto;
  }
</style>
