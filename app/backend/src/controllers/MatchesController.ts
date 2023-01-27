import { Request, Response } from 'express';
import MatchService from '../services/MatchesService';

export default class MatchesController {
  public matchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public getMatches = async (req: Request, res: Response) => {
    if (req.query.inProgress === undefined) {
      const allMatches = await this.matchService.getAllMatches();

      return res.status(200).json(allMatches);
    }

    const inProgress = req.query.inProgress === 'true';

    const selectedMatches = await this.matchService.selectMatches(inProgress);

    return res.status(200).json(selectedMatches);
  };
}
