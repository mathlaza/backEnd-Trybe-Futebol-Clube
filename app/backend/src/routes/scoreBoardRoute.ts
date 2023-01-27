import * as express from 'express';

import scoreBoardController from '../controllers/scoreBoardController';

const scoreBoardRoute = express.Router();

scoreBoardRoute.get('/home', scoreBoardController.getScoreBoard);

scoreBoardRoute.get('/away', scoreBoardController.getScoreBoard);

scoreBoardRoute.get('/', scoreBoardController.getCompleteScoreBoard);

export default scoreBoardRoute;
