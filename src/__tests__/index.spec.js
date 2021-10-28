/*
 * @Author: liaolongdong
 * @Date: 2021-06-29 22:30:13
 * @LastEditTime: 2021-07-16 18:02:11
 * @LastEditors: liaolongdong
 * @Description:
 * @FilePath: /webpack5-demo/src/__tests__/index.spec.js
 */
import { square, cube, testLog } from '../math'

describe('test index', () => {
  before('before', () => {
    cy.log('before')
    cy.login('廖小新', '666666')
    cy.log(`getLocalStorage name: ${localStorage.getItem('name')}`)
  })
  beforeEach('beforeEach', () => {
    cy.log('beforeEach')
    Cypress.env('username', 'Better')
    cy.log(Cypress.env())
    cy.restoreLocalStorage()
  })
  after('after', () => {
    cy.log('after')
  })
  afterEach('afterEach', () => {
    cy.log('afterEach')
    cy.saveLocalStorage()
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
  it('math function test', () => {
    expect(square(3), 'test square method').to.equal(9)
    expect(cube(2)).to.equal(8)
    assert.equal(testLog(), undefined)
    describe('math inner', () => {
      cy.log('math inner log')
    })
  })
})
