// JavaScript Document

class TTTGame extends TTTBoard{
  constructor(id) {
    const urlParams = new URLSearchParams(window.location.search)
    const size = Number(urlParams.get("size")) || 3
    const winCondition = Number(urlParams.get("win")) || size

    super(id,size, winCondition <= size ? winCondition : size);
    this.xWin = 0
    this.oWin = 0
    this.xTarget = "#x_win"
    this.oTarget = "#o_win"
    this.alertContainer = "#tttAlert"

  }
  startGame(){
    super.createGameBoard()
    $(this.alertContainer).text(super.getPlayerTurn() + " Turn")

  }
  setResetCallBack(target = "#reset"){
    $(target).click(()=> {
      super.reCreateGameBoard()
      $(this.alertContainer)
        .html(`<b>${super.getPlayerTurn()}</b> Turn`)
        .attr("class","alert alert-info mb-0 text-center")
    })
  }
  setXWinRecordTarget(target){
    this.xTarget = target
  }
  setOWinRecordTarget(target){
    this.oTarget = target
  }
  setAlertContainer(target){
    this.alertContainer = target
  }
  updateTotalScore(winner){
    if (winner === TTTBoard.WIN_STATE.x)
      $(this.xTarget).val(++this.xWin)
    else
      $(this.oTarget).val(++this.oWin)
  }
  playerAction(x, y) {
    super.playerAction(x, y);
    if (super.getGameState() !== TTTGame.GAME_STATE.end)
      $(this.alertContainer)
        .html(`<b>${super.getPlayerTurn()}</b> Turn`)
  }

  checkWinCondition(x, y) {
    const winner = super.checkWinCondition(x, y);

    if (winner && winner === TTTGame.WIN_STATE.draw) {
      $(this.alertContainer)
        .text("It's a tie. Start a new game.")
        .attr("class", "alert alert-success mb-0 text-center")
    }
    else if (winner) {
      this.updateTotalScore(winner)
      $(this.alertContainer)
        .html(`<b>${super.getPlayerTurn()} Won</b>. Start a new round.`)
        .attr("class", "alert alert-success mb-0 text-center")
    }

  }

}

$(document).ready(function() {
  const newTTTGame = new TTTGame("board1")
  newTTTGame.setResetCallBack("#reset")
  newTTTGame.setXWinRecordTarget("#x_win")
  newTTTGame.setOWinRecordTarget("#o_win")
  newTTTGame.setAlertContainer("#tttAlert")
  newTTTGame.startGame()
});
