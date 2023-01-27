import { Request, Response } from 'express';
import * as lodash from 'lodash';
import MatchesService from '../services/MatchesService';
import TeamsService from '../services/TeamsService';
import Matches from '../database/models/Matches';

const allPoints = (match: Matches, id: number, points: number) => {
  // Home team wins
  if (match.homeTeamId === id) {
    if (match.homeTeamGoals > match.awayTeamGoals) return points + 3;
    if (match.homeTeamGoals < match.awayTeamGoals) return points;
    return points + 1;
  }
  // Away team wins
  if (match.homeTeamGoals < match.awayTeamGoals) return points + 3;
  if (match.homeTeamGoals > match.awayTeamGoals) return points;
  return points + 1;
};

const sumPoints = (match: Matches, id: number, points: number, query: string) => {
  if (query === 'home') {
    if (match.homeTeamGoals > match.awayTeamGoals) return points + 3;
    if (match.homeTeamGoals < match.awayTeamGoals) return points + 0;
    return points + 1;
  }
  if (query === 'away') {
    if (match.homeTeamGoals < match.awayTeamGoals) return points + 3;
    if (match.homeTeamGoals > match.awayTeamGoals) return points + 0;
    return points + 1;
  }
  // '/leaderboard' complete table
  return allPoints(match, id, points);
};

const sumVictories = (matches: Matches[], id: number, query: string): number => {
  if (query === 'home') {
    return matches.filter((match: Matches) => match.homeTeamGoals > match.awayTeamGoals).length;
  }
  if (query === 'away') {
    return matches.filter((match: Matches) => match.awayTeamGoals > match.homeTeamGoals).length;
  }
  // '/leaderboard' complete table
  const homeWin = matches
    .filter((match: Matches) => match.homeTeamId === id
      && match.homeTeamGoals > match.awayTeamGoals).length;
  const awayWin = matches
    .filter((match: Matches) => match.awayTeamId === id
      && match.awayTeamGoals > match.homeTeamGoals).length;

  return homeWin + awayWin;
};

const sumDraws = (matches: Matches[]): number => {
  const result = matches
    .filter((match: Matches) => match.homeTeamGoals === match.awayTeamGoals).length;
  return result;
};

const sumLosses = (matches: Matches[], id: number, query: string) => {
  if (query === 'home') {
    return matches.filter((match: Matches) => match.homeTeamGoals < match.awayTeamGoals).length;
  }
  if (query === 'away') {
    return matches.filter((match: Matches) => match.awayTeamGoals < match.homeTeamGoals).length;
  }
  // '/leaderboard' complete table
  const homeLost = matches
    .filter((match: Matches) => match.homeTeamId === id
      && match.homeTeamGoals < match.awayTeamGoals).length;
  const awayLost = matches
    .filter((match: Matches) => match.awayTeamId === id
      && match.awayTeamGoals < match.homeTeamGoals).length;

  return homeLost + awayLost;
};

const goalsScored = (match: Matches, id: number) => {
  if (match.homeTeamId === id) {
    return match.homeTeamGoals;
  }
  return match.awayTeamGoals;
};

const goalsTaken = (match: Matches, id: number) => {
  if (match.homeTeamId === id) {
    return match.awayTeamGoals;
  }
  return match.homeTeamGoals;
};

const getEfficiency = (matches: number, totalPoints: number) => {
  const percentage = ((totalPoints * 100) / (matches * 3)).toFixed(2);
  return percentage;
};

const getTeamData = (matches: Matches[], id: number, query: string) => {
  const teamData = {
    totalPoints: 0,
    totalGames: matches.length,
    totalVictories: sumVictories(matches, id, query),
    totalDraws: sumDraws(matches),
    totalLosses: sumLosses(matches, id, query),
    goalsFavor: 0,
    goalsOwn: 0,
  };
  matches.forEach((match: Matches) => {
    const points = sumPoints(match, id, teamData.totalPoints, query);
    teamData.totalPoints = points;
    teamData.goalsFavor += goalsScored(match, id);
    teamData.goalsOwn += goalsTaken(match, id);
  });

  return teamData;
};

const matchesService = new MatchesService();
const teamsService = new TeamsService();

const retrieveTable = async (allMatches: Matches[], id: number, query: string) => {
  let matches = [];

  if (query === 'home') {
    matches = allMatches.filter((m) => m.homeTeamId === id && m.inProgress === false);
  } else if (query === 'away') {
    matches = allMatches.filter((m) => m.awayTeamId === id && m.inProgress === false);
  } else {
    matches = allMatches
      .filter((m) => (m.homeTeamId === id || m.awayTeamId === id) && m.inProgress === false);
  }

  const teamData = getTeamData(matches, id, query);
  const oneTeam = await teamsService.getTeamById(id.toString());

  return {
    name: oneTeam?.teamName,
    ...teamData,
    goalsBalance: (teamData.goalsFavor - teamData.goalsOwn),
    efficiency: getEfficiency(matches.length, teamData.totalPoints),
  };
};

const getScoreBoard = async (req: Request, res: Response): Promise<void> => {
  const { path } = req.route;
  const query = path.substring(1);
  const allTeams = await teamsService.getAllTeams();
  const allMatches = await matchesService.getAllMatches();
  const teamsId = allTeams.map((team) => team.id);
  const teamMatches = await Promise.all(teamsId
    .map((teamId) => retrieveTable(allMatches, teamId, query)));

  const ORDER = lodash.orderBy(
    teamMatches,
    ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'],
    ['desc', 'desc', 'desc', 'desc', 'desc'],
  );

  res.status(200).json(ORDER);
};

const getCompleteScoreBoard = async (req: Request, res: Response): Promise<void> => {
  const allTeams = await teamsService.getAllTeams();
  const teamsId = allTeams.map((team) => team.id);
  const allMatches = await matchesService.getAllMatches();
  const teamMatches = await Promise.all(teamsId
    .map((teamId) => retrieveTable(allMatches, teamId, '')));

  const ORDER = lodash.orderBy(
    teamMatches,
    ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'],
    ['desc', 'desc', 'desc', 'desc', 'desc'],
  );

  res.status(200).json(ORDER);
};

export default { getScoreBoard, getCompleteScoreBoard };
