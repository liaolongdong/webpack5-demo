/*
 * @Author: liaolongdong
 * @Date: 2021-06-29 22:30:13
 * @LastEditTime: 2021-06-30 21:53:41
 * @LastEditors: liaolongdong
 * @Description:
 * @FilePath: /webpack5-demo/src/__tests__/index.spec.js
 */
describe('test index', () => {
  beforeEach('beforeEach', () => {
    Cypress.env('username', 'Better')
  })
  it('index', () => {
    cy.visit('/')
    cy.get('.icon')
      .children()
      .should('have.attr', 'xlink:href', '#icon-liebiao')
    cy.get('#测试markdown转html').contains('测试markdown转html')
    cy.get('.hello').within(() => {
      cy.contains('Hello webpack 廖小新')
      cy.get('button')
        .should('have.text', 'Click me and check the console!')
        .click()
    })
  })
})
