// import address from '../fixtures/cep.json'

// describe('Página de CEP', () => {
//     beforeEach(() => {
//         cy.login()
//         cy.goTo('Integração', 'Consulta de CEP')
//     })


//     it('Deve buscar CEP existente', () => {


//         cy.get('#cep').type(address.cep)
//         cy.contains('button', 'Buscar').click()

//         cy.get('#street')
//             .should('have.value', address.street)

//         cy.get('#neighborhood')
//             .should('have.value', address.neighborhood)

//         cy.get('#city')
//             .should('have.value', address.city)

//         cy.get('#state')
//             .should('have.value', address.state)


//     })
// })




import address from '../fixtures/cep.json'

describe('Página de CEP', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Integração', 'Consulta de CEP')
    })

    it('Deve buscar CEP existente', () => {

        // 👇 Intercepta a chamada externa do ViaCEP
        cy.intercept('GET', `https://viacep.com.br/ws/${address.cep}/json/`,
             { statusCode: 200,
                body: {
                    logradouro: address.street,
                    bairro: address.neighborhood,
                    localidade: address.city,
                    uf: address.state
                }
              })
            .as('getCep')

        cy.get('#cep').type(address.cep)
        cy.contains('button', 'Buscar').click()

        // 👇 Espera a resposta da API externa
        cy.wait('@getCep').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
            expect(response.body).to.have.property('logradouro')
        })

        // 👇 Valida os campos preenchidos na tela
        cy.get('#street')
            .should('have.value', address.street)

        cy.get('#neighborhood')
            .should('have.value', address.neighborhood)

        cy.get('#city')
            .should('have.value', address.city)

        cy.get('#state')
            .should('have.value', address.state)
    })
})
