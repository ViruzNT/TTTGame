class TTTBoard{
  static BOARD_VALUE = {
    x: {
      value: "X",
      classNames: "btn disabled btn-info"
    },
    o: {
      value: "O",
      classNames: "btn disabled btn-primary"
    },
    none: {
      value: "+",
      classNames: "btn btn-outline-secondary"
    },
  }
  static WIN_STATE = {
    x: TTTBoard.BOARD_VALUE.x.value,
    o: TTTBoard.BOARD_VALUE.o.value,
    draw: "Draw"
  }
  static GAME_STATE = {
    start: "START",
    end: "END",
  }
  constructor(id, size = 3, winCondition) {
    this.boardId = id
    this.boardSize = size
    this.boardWinCondition = winCondition || size
    this.gameState = TTTBoard.GAME_STATE.start
    this.playerTurn = TTTBoard.BOARD_VALUE.x
    this.board = this.populateBoard(size)
  }
  populateBoard(){
    return new Array(this.boardSize).fill(TTTBoard.BOARD_VALUE.none.value)
      .map(() => new Array(this.boardSize).fill(TTTBoard.BOARD_VALUE.none.value))
  }
  reCreateGameBoard(){
    this.gameState = TTTBoard.GAME_STATE.start
    this.playerTurn = TTTBoard.BOARD_VALUE.x
    this.board = this.populateBoard(this.boardSize)
    this.createGameBoard();
  }
  createGameBoard(){
    const vm = this
    $(`#${this.boardId}`).html("")
    this.board.forEach((item, rowIndex)=>{
      let boardRow =  $("<div/>").addClass("row justify-content-center no-gutters")

      item.forEach((value, colIndex) => {
        boardRow.append(()=>{
          return $("<div/>")
            .attr("class", "col-auto")
            .append(()=>{
              return $("<button type='button'/>")
                .attr("id", `${this.boardId}-x${rowIndex}y${colIndex}`)
                .attr("class", TTTBoard.BOARD_VALUE.none.classNames)
                .text(value)
                .click(function () {
                  vm.playerAction(rowIndex,colIndex)
                })
            })
        })
      })
      boardRow.appendTo(`#${this.boardId}`)
    })
  }

  playerAction(x,y){
    if (this.gameState === TTTBoard.GAME_STATE.end) return;
    if (this.board[x][y] !== TTTBoard.BOARD_VALUE.none.value) return;

    this.board[x][y] = this.playerTurn.value
    $(`#${this.boardId}-x${x}y${y}`)
      .attr("class", this.playerTurn.classNames)
      .prop("disabled",true)
      .text(this.playerTurn.value)

    this.checkWinCondition(x,y)

    this.playerTurn =  this.playerTurn.value === TTTBoard.BOARD_VALUE.x.value ? TTTBoard.BOARD_VALUE.o : TTTBoard.BOARD_VALUE.x
  }
  disableGameBoard(){
    this.board.forEach((xItem, x)=>
      xItem.forEach((yItem, y)=> $(`#${this.boardId}-x${x}y${y}`).prop("disabled",true) )
    )
    this.gameState = TTTBoard.GAME_STATE.end
  }
  checkWinCondition(x,y){
    if(this.rowWinCondition(x) || this.colWinCondition(y) || this.diagonalWinCondition(x,y)) {
      this.disableGameBoard()
      return this.playerTurn.value
    }
    else if (this.board.flat(1).every(val=> val !== TTTBoard.BOARD_VALUE.none.value)) {
      this.disableGameBoard()
      return TTTBoard.WIN_STATE.draw
    }
  }
  maxSameInARow(arr){
    let maxCount = 0
    let count = arr.reduce((total, val) => {
      if (val)
        total++
      else if ( total >= maxCount){
        maxCount = total
        total = 0
      }
      return  total
    },0)
    return maxCount >= count ? maxCount : count
  }
  rowWinCondition(x){
    let posCount = this.maxSameInARow(this.board[x]
      .map(item=> item === this.playerTurn.value ? 1 : 0))
    return posCount >= this.boardWinCondition
  }
  colWinCondition(y){
    let posCount = this.maxSameInARow(this.board.map(row=> row[y])
      .map(item=> item === this.playerTurn.value ? 1 : 0))
    return posCount >= this.boardWinCondition
  }
  diagonalWinCondition(x,y){
    const boardMapping = this.board.map(x=> x.map(y=> y === this.playerTurn.value ? 1 : 0 ))
    return this.diagonal1WinCondition(x,y,boardMapping) || this.diagonal2WinCondition(x,y,boardMapping)
  }
  diagonal1WinCondition(x,y,board){
    let diagonalArr = []
    for ( let xx = x, yy = y ; xx >= 0 && yy >= 0; xx--, yy-- ){
      diagonalArr.unshift(board[xx][yy])
    }
    diagonalArr.pop()
    for ( let xx = x, yy = y ; xx < this.boardSize && yy < this.boardSize; xx++, yy++ ){
      diagonalArr.push(board[xx][yy])
    }
    if (diagonalArr.length >= this.boardWinCondition)
      return this.maxSameInARow(diagonalArr) >= this.boardWinCondition
    return 0
  }
  diagonal2WinCondition(x,y,board){
    let diagonalArr = []
    for ( let xx = x, yy = y ; xx >= 0 && yy < this.boardSize; xx--, yy++ ){
      diagonalArr.unshift(board[xx][yy])
    }
    diagonalArr.pop()
    for ( let xx = x, yy = y ; xx < this.boardSize && yy >= 0; xx++, yy-- ){
      diagonalArr.push(board[xx][yy])
    }
    if (diagonalArr.length >= this.boardWinCondition)
      return this.maxSameInARow(diagonalArr) >= this.boardWinCondition
    return 0
  }

  getPlayerTurn(){
    return this.playerTurn.value
  }
  getGameState(){
    return this.gameState
  }
}