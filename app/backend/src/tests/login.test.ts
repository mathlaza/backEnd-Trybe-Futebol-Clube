import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Users from '../database/models/Users';
import usersMock from './mocks/usersMock';
import * as bcrypt from 'bcryptjs';

import { app } from '../app';
chai.use(chaiHttp);
const { expect } = chai;

describe('Testa a rota /login', () => {
  it("Checa se sem algum campo preenchido não é possível fazer login", async () => {
    const email = "";
    const password = "xablau123";
    const result = await chai.request(app).post("/login").send({ email, password });

    expect(result.status).to.equal(400);
    expect(result.text).to.deep.equal('{"message":"All fields must be filled"}');
  });

  it("Checa se com um email inválido não é possível fazer login", async () => {
    const email = "xablau";
    const password = "xablau123";
    const result = await chai.request(app).post("/login").send({ email, password });

    expect(result.status).to.equal(401);
    expect(result.text).to.deep.equal('{"message":"Incorrect email or password"}');
  });

  it("Checa se a senha tiver menos de 6 caracteres não é possível fazer login", async () => {
    const email = "xablau@gmail.com";
    const password = "123";
    const result = await chai.request(app).post("/login").send({ email, password });

    expect(result.status).to.equal(401);
    expect(result.text).to.deep.equal('{"message":"Incorrect email or password"}');
  });

  it("Checa se retorna o tipo de usuário com um token correto", async () => {
    sinon.stub(Users, "findOne").resolves({...usersMock} as Users);
    sinon.stub(bcrypt, "compare").resolves(true);
    
    const email = "xablau@xablas.com";
    const password = "xablauzinho123";

    const result = await chai.request(app).post('/login').send({ email, password });
    expect(result.status).to.have.equal(200);
    expect(result.body).to.have.property('token');

    const getRole = await chai.request(app).get('/login/validate').set('authorization', result.body.token)
    expect(getRole.status).to.equal(200);
    expect(getRole.body).to.deep.equal({ role: 'user' });

    (Users.findOne as sinon.SinonStub).restore();
    (bcrypt.compare as sinon.SinonStub).restore();
  });

  it("Checa se mandando um header sem token, retorna erro", async () => {
    const header = '';
    const result = await chai.request(app).get("/login/validate").set('Authorization', header);

    expect(result.status).to.equal(401);
    expect(result.text).to.deep.equal('{"message":"Token not found"}');
  });

  it("Checa se mandando um header com token errado, retorna erro", async () => {
    const header = 'dafsdsffassd';
    const result = await chai.request(app).get("/login/validate").set('Authorization', header);

    expect(result.status).to.equal(401);
    expect(result.text).to.deep.equal('{"message":"Token must be a valid token"}');
  });
});
