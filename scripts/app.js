const tic_tac_toe = {
  board: ['','','','','','','','',''],
  gameControl: {
    options: ['O','X'],
    turnOption: 1,
    change() {
      this.turnOption = this.turnOption === 0 ? 1 : 0;
    }
  },
  containerElement: null,
  gameOver: false,
  winningSequences: [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ],

  init(container) {
    this.containerElement = container;
  },

  handleUserPlacement(position) {
    if (this.gameOver || this.board[position] !== '') return false;

    const currentSymbol = this.gameControl.options[this.gameControl.turnOption];
    this.board[position] = currentSymbol;
    this.createGameBoard();

    const winningSequencesIndex = this.checkWinningSequences(currentSymbol);
    if (this.isGameOver()){
      this.setGameOver();
    }
    if (winningSequencesIndex >= 0) {
      this.setGameOver();
      this.highlightWinnerSelection(this.winningSequences[winningSequencesIndex]);
    } else {
      this.gameControl.change();
    }
    return true;
  },

  highlightWinnerSelection(winningSequence) {
    winningSequence.forEach((position) => {
      this
      .containerElement
      .querySelector(`div:nth-child(${position + 1})`)
      .classList.add('winner');
    });
  },

  checkWinningSequences(symbol) {
    for (i in this.winningSequences) {
      if (this.board[this.winningSequences[i][0]] === symbol
        && this.board[this.winningSequences[i][1]] === symbol
        && this.board[this.winningSequences[i][2]] === symbol
      ) {
        return i;
      }
    };
    return -1;
  },

  setGameOver() {
    this.gameOver = true;
    this.containerElement.classList.toggle('disable');
    document.querySelector('#restart').removeAttribute('disabled');
  },

  isGameOver() {
    return !this.board.includes('');
  },

  start() {
    this.board.fill('');
    this.createGameBoard();
    this.gameOver = false;
  },

  restart() {
    document.querySelector('#restart').setAttribute('disabled', true);
    if (this.isGameOver() || this.gameOver) {
      this.start();
      this.containerElement.classList.toggle('disable');
    } else if (confirm('Are you sure you want to restart this game?')) {
      this.start();
    }
  },

  createGameBoard() {
    this.containerElement.innerHTML = this.board.map((element, index) => (
      `<div class="grid__item" onclick="tic_tac_toe.handleUserPlacement('${index}')"> ${element} </div>`
    )).reduce((content, current) => content + current);
  },
};

tic_tac_toe.init(document.querySelector('#tic_tac_toe'));
tic_tac_toe.createGameBoard();
