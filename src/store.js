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
        symbol: null,  // for the end
      });
    }
    matrix.push(rowColumns);
  }
  assignMemoryPattern(matrix, GAME_SIZE);
  return matrix;
};

const matrixState = {
  gameSize: GAME_SIZE,
  revealedTiles: 0,
  successTiles: 0,
  matrix: initMatrix(GAME_SIZE),
};

export default new Vuex.Store({
  state: matrixState,
  actions: {
    restartGame({state, commit, dispatch}) {
      const newMatrix = initMatrix(GAME_SIZE);
      commit('updateMatrix', newMatrix);
      commit('setRevealedTiles', { revealed: 0, success: 0 });
      state.isGameStarted = true;
      setTimeout(() => {
        dispatch('setPatternVisibility', false);
      }, 2500);
    },
    setPatternVisibility({state, commit}, doShow) {
      // Opción 1: usando Array.map
      const updatedCell = (cell) => Object.assign({}, cell, { display: doShow });
      const updatedMatrix = state.matrix.map((row) => {
        return row.map(updatedCell);
      });

      /*
      // Opción 2: usando Array.forEach y generando un nuevo array manualmente
      const updatedMatrix = [];
      state.matrix.forEach((matrixRow) => {
        const updatedRow = [];
        matrixRow.forEach((rowCell) => {
          updatedRow.push(updatedCell((rowCell)));
        });
        updatedMatrix.push(updatedRow);
      });
      */
      commit('updateMatrix', updatedMatrix);
    },
    revealTile({state, commit, dispatch}, tile) {
      if (state.revealedTiles === state.gameSize) {
        return;
      }
      // Updating the tile content and make it displayed
      const isSuccess = tile.content === 'pattern';
      tile.content = isSuccess ? 'success' : 'error';
      tile.display = true;

      // Increasing the number of tiles revealed
      const totalRevealed = state.revealedTiles + 1;

      // If the game has ended, we display the full board result
      const isEndGame = totalRevealed === state.gameSize;
      if (isEndGame) {
        dispatch('onEndGame');
      }
      commit('setRevealedTiles', {
        revealed: totalRevealed,
        success: state.successTiles + (isSuccess ? 1 : 0),
      });
    },
    onEndGame({ state, commit, dispatch }) {
      // We'll update the content each tile at a time, to demonstrate a nice visual effect
      const timer = 100;

      const cellRevealer = (row, column) => {
        const currentTile = state.matrix[row][column];
        let cellSymbol;
        if (currentTile.content === 'empty') {
          cellSymbol = 'passed';
        } else if (currentTile.content === 'success') {
          cellSymbol = 'guessed';
        } else if (currentTile.content === 'error') {
          cellSymbol = 'wrong';
        } else if (currentTile.content === 'pattern') {
          cellSymbol = 'missed';
        }

        commit('updateTile', {
          row,
          column,
          updatedTile: Object.assign({}, currentTile, {
            display: true,
            symbol: cellSymbol,
          }),
        });

        // Now we need to check if there are more tiles to update
        const nextCol = (column + 1) % 4;
        let nextRow = row;
        if (nextCol === 0) {
          nextRow += 1;
        }

        if (nextRow < state.gameSize) {
          // Reveal the next tile
          setTimeout(() => {
            cellRevealer(nextRow, nextCol);
          }, timer);
        } else {
          state.isGameStarted = false;
        }
      };
      // Reveal the first tile to start the process
      cellRevealer(0, 0);
    },
  },
  mutations: {
    updateMatrix(state, matrix) {
      state.matrix = matrix;
    },
    setRevealedTiles(state, { revealed, success }) {
      state.revealedTiles = revealed;
      state.successTiles = success;
    },
    updateTile(state, { row, column, updatedTile }) {
      // TODO hacer "mal" al principio para demostrar que no se puede
      // modificar la matrix directamente
      const updatedMatrix = Object.assign({}, state.matrix);
      updatedMatrix[row][column] = updatedTile;

      state.matrix = updatedMatrix;
    },
  },
})
