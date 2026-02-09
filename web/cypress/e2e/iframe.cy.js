describe('Iframe', () => {
    it('Deve tocar o video ao clicar no botao play', () => {
        cy.login()
        cy.contains('Video')
            .click()

        cy.get('iframe[title="Video Player"]')
            .should('exist')
            .its('0.contentDocument.body')
            .then(cy.wrap)
            .as('iframePlayer')

        cy.get('@iframePlayer')
            .find('.play-button')
            .click()

        cy.get('@iframePlayer')
            .find('.pause-button')
            .should('be.visible')

    })



});