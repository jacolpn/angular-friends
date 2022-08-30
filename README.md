## Setup do projeto

- Angular CLI: 12.1.4
- Node: 12.20.2
- Angular: 12.1.4

## Como Rodar?

- Instale as dependências usando o comando `npm install`
- Na raiz do repositório, rode este comando `ng serve` para iniciar o servidor de desenvolvimento.
- A Aplicação estará disponível na porta `http://localhost:4200/`



### **API**

**1 -** Como instalar? <br/>
`npm install -g json-server`

**2 -** Para rodar (deixar aberto em uma outra aba do terminal, para que ele fique escutando suas ações de CRUD!), digite o seguinte comando na RAÍZ do projeto: `npm run api`

Link para mais detalhes: https://github.com/typicode/json-server

**Rotas:** <br />
`GET: /tasks`<br />
`POST: /tasks`<br />
`PUT: /tasks`<br />
`PATCH: /tasks`<br />
`DELETE: /tasks`<br />

`GET: /account` <br />
`POST: /account` <br />
`PUT: /account` <br />
`PATCH: /account` <br />
`DELETE: /account` <br />
<br/>

### **Links úteis**:

https://github.com/BeeTech-global/bee-stylish/tree/master/commits
https://www.conventionalcommits.org/en/v1.0.0/


## **Para rodar o Tailwind:**
- npm run build-css

## **Para rodar o Cypress:**
- npm run cypress-web

## Generate build:
$ `ng build --prod --base-href="/"`

## Angular CLI:
$ `ng --version`
$ `Angular CLI: 12.0.3`

## NodeJS:
$ `node -v`
$ `v15.11.0`

## JSON Server:
$ `npm install -g json-server`
$ `json-server .\db.json`

### OBS:
$ Em caso de erro ao inciar o projeto, deletar o `package-lock.json`.

$ Biblioteca utilizada: [PO-UI](https://po-ui.io/)
