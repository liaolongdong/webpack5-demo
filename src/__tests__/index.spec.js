/*
 * @Author: liaolongdong
 * @Date: 2021-06-29 22:30:13
 * @LastEditTime: 2021-06-30 00:13:42
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
  })
})
