import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const GAME_SIZE = 4;

const assignMemoryPattern = (matrix, patternSize) => {
  const totalTiles = matrix.length * 2;
  let leftPatternTiles = patternSize;
  while (leftPatternTiles > 0) {
    const newRowRandom = Math.round(Math.random() * (totalTiles - 1));
    const newColumnRandom = Math.round(Math.random() * (totalTiles - 1));
    if (newRowRandom >= matrix.length || newColumnRandom >= matrix.length) {
      // Avoid going above the matrix boundaries due to rounding
      continue; // eslint-disable-line no-continue
    }
    const cell = matrix[newRowRandom][newColumnRandom];
    if (cell.content !== 'pattern') {
      cell.content = 'pattern';
      leftPatternTiles -= 1;
    }
  }
};

const initMatrix = (gameSize) => {
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
  assignMemoryPattern(matrix, GAME_SIZE);
  return matrix;
};

const matrixState = {
  gameSize: GAME_SIZE,
  matrix: initMatrix(GAME_SIZE),
};

export default new Vuex.Store({
  state: matrixState,
  actions: {
    restartGame({ commit }) {
      const newMatrix = initMatrix(GAME_SIZE);
      commit('updateMatrix', newMatrix);
    },
  },
  mutations: {
    updateMatrix(state, matrix) {
      state.matrix = matrix;
    },
  },
})
