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
      this.$eventHub.$emit('new-game');
    },
  },
};

</script>

<style lang="scss">
  .game-info {

  }
</style>
