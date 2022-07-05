export interface IRowWordsState {
  phrase: string;
  description?: string;
}

export interface IWordsState extends IRowWordsState {
  isGuessed: boolean;
}

export enum ECommon {
  time = "time",
  teamOne = "teamOne",
  teamTwo = "teamTwo",
  winningCount = "winningCount",
  equalGame = "Equal game",
  startGame = "START GAME",
  countForWin = "Winning count",
  description = "Description",
  continueGame = "Continue game",
  winnerTeam = "Winner team",
  restartGame = "Restart game",
  next = "Next",
  team1 = "Team-1",
  team2 = "Team-2",
}
