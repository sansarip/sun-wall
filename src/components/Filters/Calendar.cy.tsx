/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import { mount } from 'cypress/react';
import Calendar from './Calendar';
import { format, subDays } from 'date-fns'


describe('Calendar', () => {
    it('The main button defaults to displaying yesterday', () => {
        // given 
        const yesterday = format(subDays(new Date(), 1), 'MMM dd, yyyy');

        // when
        mount(<Calendar />);

        // then
        cy.findByRole('button').contains(yesterday);
    })

    it('Given that the main button is clicked, then the calendar and the apply-button should be visible', () => {
        // given
        mount(<Calendar />);

        // when
        cy.findByRole('button').click();

        // then 
        cy.get('.bp4-datepicker').should('be.visible');
        cy.findByRole('button', { name: 'Apply' }).should('be.visible');
    })

    it('Given that the calendar is open, when the apply button is clicked, then the calendar should close and the onApply callback should be called with the selected date', () => {
        // given
        const [year, month, day] = [2021, 10, 16];
        const onApplySpy = cy.spy().as('onApplySpy');
        mount(<Calendar onApply={onApplySpy} />);
        cy.findByRole('button').click();
        cy.get('.bp4-datepicker-month-select > select').select('October');
        cy.get('.bp4-datepicker-year-select > select').select('' + year);
        cy.get('[tabindex="-1"] > .bp4-datepicker-day-wrapper').contains('' + day).click();

        // when
        cy.findByRole('button', { name: 'Apply' }).click();

        // then
        cy.get('@onApplySpy').should('have.been.calledWith', year, month, day);
    })
})