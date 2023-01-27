interface IMatchSave {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface IMatchSaved {
  type?: 'NOT_FOUND',
  match?: IMatchSave,
}

export { IMatchSave, IMatchSaved };
