import { Router } from 'express';
import MatchController from '../controllers/MatchesController';

const matchesRoute = Router();
const matchesController = new MatchController();

matchesRoute.get('/', matchesController.getMatches);

export default matchesRoute;
