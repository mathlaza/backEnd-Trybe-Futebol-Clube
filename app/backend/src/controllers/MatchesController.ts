import { Request, Response } from 'express';
import MatchService from '../services/MatchesService';

export default class MatchesController {
  public matchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public getMatches = async (req: Request, res: Response) => {
    const allMatches = await this.matchService.getMatches();

    return res.status(200).json(allMatches);
  };
}
