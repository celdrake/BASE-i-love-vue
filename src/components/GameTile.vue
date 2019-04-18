<template>
  <div class="game-tile" :class="tileClasses" @click="tileClick" />
</template>

<script>
export default {
  name: 'GameTile',
  props: {
    tile: {
      type: Object,
      required: true,
    },
    isGameStarted: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    tileClasses() {
      return {
        isRevealed: this.tile.display,
        [`has-${this.tile.content}`]: true,
      };
    },
  },
  methods: {
    tileClick() {
      if (!this.isGameStarted) {
        return;
      }
      this.$store.dispatch('revealTile', this.tile);
    },
  },
};

</script>

<style lang="scss">

  .game-tile {
    padding: 1.5em;
    background: #3a2a25;
    color: white;
    margin: 0;
    border: 2px solid gray;
    border-collapse: collapse;

    &.isRevealed {
      &.has-pattern {
        background-color: blue;
      }
      &.has-success,
      &.has-tick {
        background-color: limegreen;
      }
      &.has-error,
      &.has-cross {
        background-color: crimson;
      }
    }
  }
</style>
