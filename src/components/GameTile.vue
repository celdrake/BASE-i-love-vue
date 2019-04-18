<template>
  <div class="game-tile" :class="tileClasses" @click="tileClick">
    <span class="game-tile__symbol" :class="{'hasSymbol': tile.symbol !== null}">
      {{ symbol }}
    </span>
  </div>
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
    symbol() {
      switch(this.tile.symbol) {
        case 'guessed':
          return '🤩';
        case 'missed':
          return '🙅';
        case 'wrong':
          return '🤦';
        case 'passed':
        default:
          // Return a symbol even for empty cells, to keep the same space
          return '👍';
      }
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
    padding: 4em;
    background-color: #3a2a25;
    color: white;
    margin: 0;
    border: 2px solid gray;
    border-collapse: collapse;

    &.isRevealed {
      pointer-events: none;
      // State while the game is in progress
      &.has-pattern {
        background-color: #416dea;
        visibility: visible;
      }
      &.has-error {
        background-color: crimson;
        visibility: visible;
      }
      &.has-success {
        background-color: limegreen;
        visibility: visible;
      }
    }
    &__symbol {
      font-size: 1.5em;
      visibility: hidden;
      &.hasSymbol {
        visibility: visible;
      }
    }
  }
</style>
