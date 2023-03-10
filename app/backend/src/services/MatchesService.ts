import { IMatchSave } from '../Interfaces/IMatchSave';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import TeamsService from './TeamsService';

export default class MatchesService {
  public getAllMatches = async () => {
    const allMatches = await Matches.findAll({
      include: [{
        model: Teams,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: Teams,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });
    return allMatches;
  };

  public teamsService;
  constructor() {
    this.teamsService = new TeamsService();
  }

  public saveMatchInProgress = async (savedMatch: IMatchSave) => {
    const homeTeam = await this.teamsService.getTeamById(savedMatch.homeTeamId.toString());
    const awayTeam = await this.teamsService.getTeamById(savedMatch.awayTeamId.toString());

    if (!homeTeam || !awayTeam) {
      return { type: 404, message: { message: 'There is no team with such id!' } };
    }

    const newMatch = await Matches.create({ ...savedMatch, inProgress: true });
    return { type: 201, message: { ...newMatch.dataValues } };
  };

  public finishMatch = async (id: string) => {
    const finished = await Matches.update({ inProgress: false }, { where: { id } });
    return finished;
  };

  public updateMatch = async (id: string, body: IMatchSave) => {
    const { homeTeamGoals, awayTeamGoals } = body;
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    const updated = await Matches.findByPk(id);
    return updated;
  };

  public matchesInProgress = async (inProgress: boolean) => {
    const matches = await Matches.findAll({
      where: { inProgress },
      include: [{
        model: Teams,
        as: 'homeTeam',
        attributes: ['teamName'],
      }, {
        model: Teams,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });

    return matches;
  };
}
