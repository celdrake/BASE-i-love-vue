import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

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
  return matrix;
};

const GAME_SIZE = 4;
const matrixState = {
  gameSize: GAME_SIZE,
  matrix: initMatrix(GAME_SIZE),
};

export default new Vuex.Store({
  state: matrixState,
  actions: {

  },
  mutations: {

  },
})
