import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TeamOption2 from './TeamOption2';
import Scoreboard from './Scoreboard';

import { Link } from 'react-router-dom';

const CreateNewGame = ({
  teams,
  setTeams,
  getTeam,
  homeTeamScoreboard,
  setHomeTeamScoreboard,
  awayTeamScoreboard,
  setAwayTeamScoreboard,
  createMatch,
  finishMatch,
}) => {
  const notCreated = 'not-created';
  const [inProgress, setInProgress] = useState(notCreated);
  const [createdMatch, setCreatedMatch] = useState(notCreated);

  return (
    <section className="match-settings-section">
      <form className="match-settings-form">
        <div className="match-settings-form-options">
          <TeamOption2
            testId="insertion_matches__select_home_team"
            teams={teams}
            setTeams={setTeams}
            homeTeam
            getTeam={getTeam}
          />
          <Scoreboard
            testId="insertion_matches__select_quantity_goals_home_team"
            homeTeam
            score={homeTeamScoreboard}
            setScore={setHomeTeamScoreboard}
          />
          <div className="match-settings-form-versus">
            <span />
            <span>X</span>
          </div>
          <Scoreboard
            testId="insertion_matches__select_quantity_goals_away_team"
            homeTeam={false}
            score={awayTeamScoreboard}
            setScore={setAwayTeamScoreboard}
          />
          <TeamOption2
            testId="insertion_matches__select_away_team"
            teams={teams}
            setTeams={setTeams}
            homeTeam={false}
            getTeam={getTeam}
          />
        </div>
        <div className="match-settings-form-buttons">
          <Link
            to="/matches"
          >
            <button
              data-testid="insertion_matches__save_match_btn"
              onClick={async () => {
                setTimeout(() => {
                  window.location.reload(false);
                }, 20);
                const body = await createMatch();
                setCreatedMatch(body);
                setInProgress('In-Progress');
              }}
              type="button"
              disabled={(inProgress !== notCreated)}
            >
              Salvar Partida

            </button>
            <button
              data-testid="insertion_matches__finish_match_btn"
              onClick={() => {
                finishMatch(createdMatch.id);
                setTimeout(() => {
                  window.location.reload(false);
                }, 20);
              }}
              type="button"
              disabled={(inProgress === notCreated)}
            >
              Finalizar Partida

            </button>
          </Link>
        </div>
      </form>
    </section>
  );
};

CreateNewGame.propTypes = ({
  teams: PropTypes.arrayOf(PropTypes.object),
  setTeams: PropTypes.func,
  getTeam: PropTypes.func,
  homeTeamScoreboard: PropTypes.string,
  setHomeTeamScoreboard: PropTypes.func,
  awayTeamScoreboard: PropTypes.string,
  setAwayTeamScoreboard: PropTypes.func,
}).isRequired;

export default CreateNewGame;
