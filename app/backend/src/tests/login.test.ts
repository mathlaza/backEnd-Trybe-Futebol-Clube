import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Users from '../database/models/Users';
import UsersMock from './mocks/UsersMock';
import * as bcrypt from 'bcryptjs';

import { app } from '../app';

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
    sinon
      .stub(bcrypt, "compare")
      .resolves(true);
  });

  afterEach(() => {
    (Users.findOne as sinon.SinonStub).restore();
    (bcrypt.compare as sinon.SinonStub).restore();
  })

  it('Checa se retorna um token válido na rota /login', async () => {
    const email = UsersMock.email;
    const password = UsersMock.password;

    const result = await chai.request(app).post('/login').send({ email, password });

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.an('object');
    expect(result.body).have.property("token");
  });

  it("Checa se sem algum campo preenchido não é possível fazer login", async () => {
    const email = "";
    const password = "xablau123";
    const result = await chai.request(app).post("/login").send({ email, password });

    expect(result.status).to.equal(400);
    expect(result.text).to.deep.equal('{"message":"Todos os campos devem estar preenchidos!"}');
  });

  it("Checa se com um email inválido não é possível fazer login", async () => {
    const email = "xablau";
    const password = "xablau123";
    const result = await chai.request(app).post("/login").send({ email, password });

    expect(result.status).to.equal(400);
    expect(result.text).to.deep.equal('{"message":"Formato de e-mail inválido!"}');
  });

  it("Checa se a senha tiver menos de 6 caracteres não é possível fazer login", async () => {
    const email = "xablau@gmail.com";
    const password = "123";
    const result = await chai.request(app).post("/login").send({ email, password });

    expect(result.status).to.equal(400);
    expect(result.text).to.deep.equal('{"message":"Sua senha deve ter pelo menos 6 caracteres!"}');
  });

});
