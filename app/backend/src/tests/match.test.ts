import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
chai.use(chaiHttp);
const { expect } = chai;

describe('Testa a rota /matches', () => {
  afterEach(sinon.restore);

  it('Checa se retornou jogos em progresso', async () => {
    const result = await chai.request(app).get('/matches?inProgress=true');
    expect(result.status).to.equal(200);
  });

  it('Checa se retornou jogos finalizados', async () => {
    const result = await chai.request(app).get('/matches?inProgress=false');
    expect(result.status).to.equal(200);
  });

  it('Checa se retornou todos os jogos', async () => {
    const result = await chai.request(app).get('/matches');
    expect(result.status).to.equal(200);
  });

  it('Checa se finaliza um jogo escolhido', async () => {
    const result = await chai.request(app).patch('/matches/1/finish')
    expect(result.status).to.equal(200);
  });

  it('Checa se dá erro ao não informar um token', async () => {
    const result = await chai.request(app).post('/matches').send({
      homeTeamId: 400,
      awayTeamId: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2
    });
    expect(result.status).to.equal(401);
  });
});
