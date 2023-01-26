import { Request, Response, RequestHandler } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamController {
  public teamsService: TeamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  public getAllTeams: RequestHandler = async (_req: Request, res: Response) => {
    const allTeams = await this.teamsService.getAllTeams();

    return res.status(200).json(allTeams);
  };

  public getTeamById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const oneTeam = await this.teamsService.getTeamById(id);

    return res.status(200).json(oneTeam);
  };
}
