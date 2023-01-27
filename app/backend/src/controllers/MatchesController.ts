import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  public matchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  public getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    let chosen = await this.matchesService.getAllMatches();

    if (inProgress) {
      const selectedProgress = inProgress === 'true';

      chosen = chosen.filter((chosed) => chosed.inProgress === selectedProgress);
    }
    return res.status(200).json(chosen);
  };

  public saveMatchInProgress = async (req: Request, res: Response) => {
    const match = req.body;
    const addedMatch = await this.matchesService.saveMatchInProgress(match);

    return res.status(addedMatch.type).json(addedMatch.message);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.matchesService.finishMatch(id);
    return res.status(200).json({ message: 'Finished' });
  };
}
