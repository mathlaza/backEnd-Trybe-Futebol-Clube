import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

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

  public getMatchesInProgress = async (inProgress: boolean) => {
    const matchesInProgress = await Matches.findAll({
      where: { inProgress },
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
    return matchesInProgress;
  };
}
