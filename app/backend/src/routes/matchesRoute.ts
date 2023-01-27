import { Router } from 'express';
import validateSavedMatches from '../middlewares/saveMatch';
import { authToken } from '../middlewares/token';
import MatchController from '../controllers/MatchesController';

const matchesRoute = Router();
const matchesController = new MatchController();

matchesRoute.get('/', matchesController.getMatches);

matchesRoute.post('/', authToken, validateSavedMatches, matchesController.saveMatchInProgress);

matchesRoute.patch('/:id/finish', matchesController.finishMatch);

matchesRoute.patch('/:id', matchesController.updateMatch);

export default matchesRoute;
