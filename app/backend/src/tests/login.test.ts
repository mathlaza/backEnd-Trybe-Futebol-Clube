import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Users from '../database/models/Users';
import UsersMock from './mocks/usersMock';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import usersMock from './mocks/usersMock';

chai.use(chaiHttp);
const { expect } = chai;
// let chaiHttpResponse: Response;

describe('Testa a rota /login', () => {

  beforeEach(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves({
        ...UsersMock
      } as Users);
  });

  afterEach(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Checa se retorna um token válido na rota /login', async () => {
    const mail = usersMock.email;
    const password = usersMock.password;

    const result = await chai
    .request(app)
    .post('/login')
    .send({ mail, password });

    expect(result.body).to.be.an('object');
    expect(result.body).to.have.property('token');
    expect(result).to.have.status(200);
  });

});
