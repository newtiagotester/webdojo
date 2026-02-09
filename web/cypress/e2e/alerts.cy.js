describe('Alertas na aplicação', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })

    it('Deve verificar o alerta de JS', () => {
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou um Alert Box!')
        })

        cy.contains('button', 'Mostrar Alert').click()
    })

    it('Deve confirmar um dialogo e validar a resposta positiva', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return true
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })


    it('Deve confirmar um dialogo e validar a resposta negativa', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return false
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve preencher um prompt e validar o valor digitado', () => {
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Tiago')
        })

        cy.on('window:prompt', (msg) => {
            expect(msg).to.equal('Olá Tiago! Boas vindas ao WebDojo!')
        })

        cy.contains('button', 'Mostrar Prompt').click()

    })



})