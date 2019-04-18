<template>
  <div class="game-tile" :class="tileClasses" />
</template>

<script>
export default {
  name: 'GameTile',
  props: {
    tile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    tileClasses() {
      return {
        isRevealed: this.tile.display,
        hasPattern: this.tile.content === 'pattern',
      };
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

    &.hasPattern {
      &.isRevealed {
        background-color: blue;
      }
    }
  }
</style>
