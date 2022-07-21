import { mount } from 'cypress/react';
import Base from "./Base";

const assertPopoverIsHidden = (content: string) => {
    cy.log('Asserting that the popover is hidden');
    cy.findByText(content).should('not.be.visible');
    cy.get('.filter-base_actions').should('not.be.visible');
};

describe('Base', () => {
    it('When the main button is clicked, then the popover and its contents should be visible', () => {
        // given
        const props = {
            label: 'Click me',
            children: `Ullamco laboris nisi ut aliquid ex ea commodi consequat.`
        }
        mount(<Base {...props} />);

        // when
        cy.findByRole('button', { name: props.label }).click();

        // then
        cy.findByText(props.children).should('be.visible');
    })
    it('Given that the popover is open, when main button is clicked, then the popover closes and the onClose callback should be called', () => {
        // given
        const onCloseSpy = cy.spy().as('onCloseSpy');
        const props = {
            label: 'Click me',
            children: `A communi observantia non est recedendum.`,
            onClose: onCloseSpy
        }
        mount(<Base {...props} />);
        cy.findByRole('button', { name: props.label }).click();

        // when
        cy.findByRole('button', { name: props.label }).click();

        // then
        cy.get('@onCloseSpy').should('have.been.called');
        assertPopoverIsHidden(props.children);
    }
    )
    it('Given that the popover is open, when the apply button is clicked, then the popover closes and the onApply callback should be called', () => {
        // given
        const onApplySpy = cy.spy().as('onApplySpy');

        const props = {
            label: 'Click me',
            children: `Cras mattis iudicium purus sit amet fermentum.`,
            onApply: onApplySpy,
        }
        mount(<Base {...props} />);
        cy.findByRole('button', { name: props.label }).click();

        // when
        cy.findByRole('button', { name: 'Apply' }).click();

        // then
        cy.get('@onApplySpy').should('have.been.called');
        assertPopoverIsHidden(props.children);
    })
    it('Given that the popover is open, when the clear button is clicked, then the popover closes and the onClear callback should be called', () => {
        // given
        const onClearSpy = cy.spy().as('onClearSpy');

        const props = {
            label: 'Click me',
            children: `Cras mattis iudicium purus sit amet fermentum.`,
            onClear: onClearSpy,
        }
        mount(<Base {...props} />);
        cy.findByRole('button', { name: props.label }).click();

        // when
        cy.findByRole('button', { name: 'Clear' }).click();

        // then
        cy.get('@onClearSpy').should('have.been.called');
        assertPopoverIsHidden(props.children);
    })
})