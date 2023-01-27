import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class MatchesService {
  public getMatches = async () => {
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
}
