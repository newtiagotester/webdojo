Cypress.Commands.add('fillConsultancyForm', (form) => {
    cy.get('#name').type(form.name)
    cy.get('#email').type(form.email)
    cy.get('input[placeholder="(00) 00000-0000"]')
        .type(form.phone)
        .should('have.value', '(11) 9999-1000')

    cy.get('#consultancyType').select(form.consultancyType)


    if (form.personType === 'cpf') {
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .check()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('not.be.checked')
    }

    if (form.personType === 'cnpj') {
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .check()
            .should('be.checked')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('not.be.checked')

        cy.contains('label', 'CNPJ')
            // .should('be.visible')
            .parent()
            .find('input')
            .type(form.document)
    }



    form.discoveryChannels.forEach(channel => {
        cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')
    })

    cy.get('input[type="file"]')
        .selectFile(form.file, { force: true })

    cy.get('#details')
        .type(form.description)




    form.techs.forEach(tech => {
        cy.get('#technologies')
            .type(`${tech}{enter}`)

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should('be.visible')
    })

    if (form.terms === true) {
        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
            .should('be.checked')
    }




});

Cypress.Commands.add('submitConsultancyForm', (form) => {
    cy.contains('button', 'Enviar formulário')
        .click()
});


Cypress.Commands.add('validateConsultancyModal', () => {
    cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})
