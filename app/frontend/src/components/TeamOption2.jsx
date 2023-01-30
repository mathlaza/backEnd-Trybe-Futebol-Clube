import React from 'react';
import PropTypes from 'prop-types';

const TeamOption = ({ teams, homeTeam, getTeam, testId }) => (
  <label htmlFor={(homeTeam) ? 'home-team-scoreboard' : 'away-team-scoreboard'}>
    {(homeTeam) ? <p>Time Mandante</p> : <p>Time Visitante</p>}
    <select
      data-testid={testId}
      onChange={({ target: { value } }) => {
        const homeOrAway = (homeTeam) ? 'homeTeam' : 'awayTeam';
        getTeam(value, homeOrAway);
      }}
    >
      <option key={16} value={''}>{''}</option>
      <option key={0} value={'Avaí/Kindermann'}>{'Avaí/Kindermann'}</option>
      <option key={1} value={'Bahia'}>{'Bahia'}</option>
      <option key={2} value={'Botafogo'}>{'Botafogo'}</option>
      <option key={3} value={'Corinthians'}>{'Corinthians'}</option>
      <option key={4} value={'Cruzeiro'}>{'Cruzeiro'}</option>
      <option key={5} value={'Ferroviária'}>{'Ferroviária'}</option>
      <option key={6} value={'Flamengo'}>{'Flamengo'}</option>
      <option key={7} value={'Grêmio'}>{'Grêmio'}</option>
      <option key={8} value={'Internacional'}>{'Internacional'}</option>
      <option key={9} value={'Minas Brasília'}>{'Minas Brasília'}</option>
      <option key={10} value={'Napoli-SC'}>{'Napoli-SC'}</option>
      <option key={11} value={'Palmeiras'}>{'Palmeiras'}</option>
      <option key={12} value={'Real Brasília'}>{'Real Brasília'}</option>
      <option key={13} value={'Santos'}>{'Santos'}</option>
      <option key={14} value={'São José-SP'}>{'São José-SP'}</option>
      <option key={15} value={'São Paulo'}>{'São Paulo'}</option>
    </select>
  </label>
);

TeamOption.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  homeTeam: PropTypes.bool.isRequired,
  getTeam: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};

export default TeamOption;
