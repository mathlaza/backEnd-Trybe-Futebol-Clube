import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /leaderboard', () => {
  afterEach(sinon.restore);

  it('Checa se retornou a classificação total', async () => {
    const result = await chai.request(app).get('/leaderboard');
    expect(result.body).to.be.an('array');
    expect(result.status).to.be.equal(200);
  });

  it('Checa se retornou a classificação de home teams', async () => {
    const result = await chai.request(app).get('/leaderboard/home');
    expect(result.body).to.be.an('array');
    expect(result.status).to.be.equal(200);
  });

  it('Checa se retornou a classificação de away teams', async () => {
    const result = await chai.request(app).get('/leaderboard/away');
    expect(result.body).to.be.an('array');
    expect(result.status).to.be.equal(200);
  });
});
