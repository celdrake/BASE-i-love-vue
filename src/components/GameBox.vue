<template>
  <div class="game-box">
    <div v-for="(row, rowIndex) in matrix" :key="rowIndex">
      <div v-for="(cell, cellIndex) in row" :key="cellIndex">
        {{ cell.content }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GameBox',
  data() {
    return {
      matrix: this.initMatrix(4),
    };
  },
  methods: {
    initMatrix(gameSize) {
      const matrix = [];
      for (let row = 0; row < gameSize; row += 1) {
        const rowColumns = [];
        for (let col = 0; col < gameSize; col += 1) {
          rowColumns.push({
            content: 'empty', // empty, pattern, success, error
            display: true,
          });
        }
        matrix.push(rowColumns);
      }
      return matrix;
    },
  },
};

</script>

<style lang="scss">
  .game-box {

  }
</style>
