import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();
const teamsRoute = Router();

teamsRoute.get('/', teamsController.getAllTeams);

teamsRoute.get('/:id', teamsController.getTeamById);

export default teamsRoute;
