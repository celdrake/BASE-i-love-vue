<template>
  <div class="game-box">
    <div class="game-box__row" v-for="(row, rowIndex) in matrix" :key="rowIndex">
      <game-tile v-for="(cell, cellIndex) in row" :key="cellIndex"
                 :tile="cell" :is-game-started="isGameStarted" />
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

import GameTile from './GameTile.vue';

export default {
  name: 'GameBox',
  components: {
    GameTile,
  },
  computed: {
    ...mapState({
      matrix: (state) => state.matrix,
    }),
    isGameStarted() {
      // TODO needs to come from the store
      return true;
    },
  },
};

</script>

<style lang="scss">
  .game-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;

    &__row {
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;
      transition: all .2s ease-out;
    }
  }
</style>
