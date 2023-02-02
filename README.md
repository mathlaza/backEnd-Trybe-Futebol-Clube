<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://blessed-trousers-production.up.railway.app/">
    <img src="TFCGIF.gif" alt="Logo" width="700" height="370">
  </a>
  
  <p align="center" style="color:#8FBC8B; font-size:25px">
    Trybe Futebol Clube 
    <br />
  </p>
</p>

<hr>

<p align="center">
  <!-- <span style="color:#66FF00; font-size:25px">Brinque</span> -->
<a href="https://blessed-trousers-production.up.railway.app/" style="color:#66FF00; font-size:25px">
    Teste o projeto! Link do deploy ⚽
  </a>
   </p>

<!-- Índice -->
# Índice

* [Sobre o projeto](#sobre-o-projeto)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Rodando localmente](#rodando-localmente)

<br>

<!-- Sobre o projeto -->
# Sobre o projeto
<div style="font-size:16px">Aplicacão desenvolvida durante o curso da Trybe no módulo de back-end, com o intuito de estudar as tecnologias utilizadas.
<br>
<br>
Trata-se de um site informativo sobre partidas e classificações de futebol.
<br>
<br>
Após efetuar o login com usuário: 
<strong>user@user.com</strong>
e senha: 
<strong>secret_user</strong>,
é possível editar partidas, mudar o número de gols e finalizar partidas em andamento. Também pode-se adicionar novas partidas e, conforme forem finalizadas, a ordem de classificacão dos times e suas informações são atualizadas!
<br>
<br>
O projeto também conta com testes de integração.
<br>
Os arquivos/pastas desenvolvidos por mim estão em <span style="color:#58a6ff">app/backend/src</span>. Todo o restante do projeto, incluindo o front-end, foi provido pela Trybe para facilitar no desenvolvimento.
</div style="font-size:16px">

<br>
<br>


# Tecnologias utilizadas
Essas foram as ferramentas utilizadas durante o desenvolvimento do projeto:
* <span style="color:#58a6ff">Node</span>
* <span style="color:#58a6ff">Express</span>
* <span style="color:#58a6ff">Sequelize</span>
* <span style="color:#58a6ff">Typescript</span>
* <span style="color:#58a6ff">MySQL</span>
* <span style="color:#58a6ff">Docker</span>
* <span style="color:#58a6ff">Mocha, Chai, Sinon</span>

<br>

<!-- Rodando localmente -->
# Rodando localmente

### Pré-requisitos:

* Node v16.15.0 (LTS) ou similar instalado. Foram encontrados erros com versões diferentes.<br>
Caso possua outra versão que não consiga rodar a aplicação, instale o nvm (Node Version Manager) e utilize os comandos:
```sh
nvm install 16.15.0
nvm use 16.15.0
```
<br>

### Iniciando o projeto:
1. Clone o repositório em uma pasta de seu computador:
```sh
git clone git@github.com:mathlaza/backEnd-Trybe-Futebol-Clube.git
```
2. Entre na pasta raiz do projeto;
```sh
cd backEnd-Trybe-Futebol-Clube
```
3. Instale as dependências:
```sh
npm install
```
4. Entre na pasta backend:
```sh
cd app && cd backend
```
5. Rode a build:
```sh
npm run build
```
6. Suba o back-end:
```sh
npm start
```
7. Entre na pasta frontend:
```sh
cd .. && cd frontend
```
8. Suba o front-end:
```sh
npm start
```
