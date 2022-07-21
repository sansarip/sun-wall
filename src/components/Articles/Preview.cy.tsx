import { mount } from 'cypress/react';
import Preview from './Preview';

describe('Preview', () => {
    it('Contents should be visible', () => {
        // given
        const article: Article.Preview = {
            article: 'Lorem ipsum',
            rank: 16,
            views: 12000,
        }

        // when
        mount(<Preview {...article}/>);

        // then
        cy.findByRole('heading', { name: article.article }).should('be.visible');
        cy.get('p').contains(article.rank).should('be.visible');
        cy.get('p').contains(article.views).should('be.visible');
    })
})
