import { RequestHandler } from 'express';

const validateSavedMatches: RequestHandler = (req, res, next) => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
};

export default validateSavedMatches;
