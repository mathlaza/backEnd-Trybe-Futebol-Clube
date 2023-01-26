import Teams from '../database/models/Teams';

export default class TeamsService {
  constructor(private _teamModel = Teams) { }

  public async getAllTeams() {
    const allTeams = await this._teamModel.findAll();
    return allTeams;
  }

  public async getTeamById(id: string) {
    const oneTeam = await this._teamModel.findByPk(id);
    return oneTeam;
  }
}
