text

# Webdojo — Testes Automatizados com Cypress

Projeto de testes E2E para a aplicação Webdojo, utilizando **Cypress**. Este guia cobre instalação, execução (desktop e mobile), estrutura do projeto e boas práticas.

---

## ✅ Pré-requisitos

• **Node.js**(LTS recomendado)
• **npm**(ou yarn)
• SO compatível com Cypress (Windows, macOS, Linux)

---

## 🛠️ Instalação

```
`# na raiz do repositório
npm install

---

## ▶️ Executando a aplicação Webdojo

A aplicação Webdojo está no mesmo repositório. Em um terminal:

```bash
npm run dev`
```

• Servidor: `serve -s dist -p 3000`(porta 3000 por padrão).
• Certifique-se de que o app esteja acessível antes de rodar os testes (ajuste o `baseUrl`no Cypress, se necessário).

---

## 🧪 Executando os testes (Cypress)

Scripts disponíveis:

```
`"scripts": {<br/>
  "dev": "serve -s dist -p 3000",<br/>
  "test": "npx cypress run --config viewportWidth=1440,viewportHeight=900",<br/>
  "test:login": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=1440,viewportHeight=900",<br/>
  "test:login:mobile": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=414,viewportHeight=896"
}`
```

• Testes completos (headless, desktop 1440x900):

```
`npm test`
```

• Somente cenário de login (desktop):

```
`npm run test:login`
```

• Login em viewport mobile (414x896):

```
`npm run test:login:mobile`
```

• Abrir Cypress UI (opcional, desenvolvimento):

```
`npx cypress open`
```

---

## 🗂️ Estrutura do projeto (Cypress)

```
`cypress/
├─ e2e/                 # Especificações E2E (ex.: login.cy.js)
├─ fixtures/            # Massa de dados e anexos
│  ├─ cep.json
│  ├─ consultancy.json
│  └─ document.pdf
└─ support/
   ├─ actions/
   │  ├─ consultancy.actions.js
   │  └─ utils.js
   ├─ commands.js       # Comandos customizados (Cypress.Commands.add)
   └─ e2e.js            # Hooks globais (before/after), setup`
```

Observações:

• Specs em `cypress/e2e/`(ex.: `login.cy.js`, referenciado nos scripts).
• `fixtures/`centraliza dados estáticos (JSON/PDF).
• `support/`reúne commands, hooks e ações reutilizáveis.

---

## ⚙️ Configuração recomendada

Exemplo de `cypress.config.js`com baseUrl e viewport padrão:

```
`// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {<br/>
    baseUrl: 'http://localhost:3000',<br/>
    viewportWidth: 1440,<br/>
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      // plugins/eventos, se necessário
      return config
    },
  },
})`
```

Variáveis de ambiente:

• Use `cypress.env.json`ou variáveis `CYPRESS_*`.
• Ex.: credenciais, URLs de API, tokens.

---

## ✍️ Convenções e reutilização

• Nomeie specs com sufixo `*.cy.js`(ex.: `login.cy.js`).
• Prefira seletores `data-testid`/ `data-cy`.
• Centralize repetição:   • `support/commands.js`(comandos)
  • `support/actions/*.js`(fluxos de negócio)
  • `support/utils.js`(helpers)
• `support/commands.js`(comandos)
• `support/actions/*.js`(fluxos de negócio)
• `support/utils.js`(helpers)

Exemplo de comando customizado e uso:

```
`// support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('[data-cy=email]').type(email)
  cy.get('[data-cy=password]').type(password, { log: false })
  cy.get('[data-cy=submit]').click()
})`
```

```
`// cypress/e2e/login.cy.js
describe('Login', () => {
  it('deve autenticar com credenciais válidas', () => {
    cy.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
    cy.url().should('include', '/dashboard')
  })
})`
```

---

## 🧭 Viewports e estratégias

• Desktop padrão: `npm test`(1440x900).
• Mobile específico: `npm run test:login:mobile`(414x896).
• Alternativa: sobrescreva via `--config viewportWidth=...,viewportHeight=...`.

---

## 🧩 Uso de fixtures

• Ex.: `cy.fixture('cep.json')`para carregar dados.
• Para anexos (ex.: `document.pdf`), utilize plugins de upload quando necessário.

---

## 🔌 Integração Contínua (dica rápida)

Pipeline típico:

1. Instalar dependências ( `npm ci`).
2. Subir a aplicação ( `npm run dev`) em background.
3. Executar testes ( `npm test`) com `baseUrl`configurado.

Dicas:

• Aguarde o servidor ficar disponível antes de rodar Cypress (healthcheck/retries).
• Armazene artifacts (screenshots/videos) do Cypress para diagnóstico.

---

## 🧷 Boas práticas

• Independência entre specs (sem ordem de execução).
• Idempotência: criar/limpar dados de teste.
• Estabilidade: evite `cy.wait`fixo; prefira asserções encadeadas.
• Logs, screenshots e vídeos habilitados no `run`para análise de falhas.

---

## 🧰 Troubleshooting

• Porta ocupada no `npm run dev`: altere `-p`e ajuste o `baseUrl`.
• Falhas intermitentes: revise seletores, esperas e `cy.intercept`.
• Erros de import/caminho: valide a árvore de diretórios e imports relativos.

---

## 📄 Licença

Ajuste conforme a política interna do projeto/organização.

---

## 📌 Scripts do projeto (referência rápida)

```
`"scripts": {<br/>
  "dev": "serve -s dist -p 3000",<br/>
  "test": "npx cypress run --config viewportWidth=1440,viewportHeight=900",<br/>
  "test:login": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=1440,viewportHeight=900",<br/>
  "test:login:mobile": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=414,viewportHeight=896"
}`
```