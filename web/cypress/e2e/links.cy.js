describe('Links abrindo em uma nova aba', () => {

    beforeEach(() => {
        cy.login()
    })

    it('Deve verificar se o link do Instagram abre em uma nova aba', () => {
        cy.get('[data-cy="instagram-link"]')
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
            .and('have.attr', 'target', '_blank')
    })

    it('Acessa link de termos de uso', () => {
        cy.contains('Formulários')
            .click()

        cy.contains('termos de uso')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Ao acessar e usar nossos serviços, você concorda em cumprir estes termos de uso.')
            .should('be.visible')

    })





});