/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import { mount } from 'cypress/react';

import FilterOption from "./FilterOption";

describe('FilterOption', () => {
    it('When the filter-option button is clicked, then the popover should be visible', () => {
        // given
        const filterOptionProps = {
            label: 'Click me',
            children: `I'm baby vinyl meditation 3 wolf moon pabst lumbersexual, craft beer locavore squid celiac gochujang. Deep v keytar occupy offal YOLO selvage brunch roof party cronut pabst readymade butcher. Palo santo keffiyeh you probably haven't heard of them, locavore tousled paleo cornhole green juice roof party pop-up. Drinking vinegar readymade pop-up intelligentsia godard coloring book gluten-free, wolf yr narwhal keffiyeh selfies direct trade church-key master cleanse. Hella trust fund microdosing succulents forage kickstarter swag actually.`
        }
        mount(<FilterOption {...filterOptionProps} />);

        // when
        cy.findByRole('button', {name: filterOptionProps.label}).click();

        // then
        cy.findByText(filterOptionProps.children).should('be.visible');
        cy.findByRole('button', {name: 'Apply'}).should('be.visible');
        cy.findByRole('button', {name: 'Clear'}).should('be.visible');
    })
    it('Given that the popover is open, when the filter-option button is clicked, then the popover should not be visible', () => {
        // given
        const filterOptionProps = {
            label: 'Click me',
            children: `I'm baby vinyl meditation 3 wolf moon pabst lumbersexual, craft beer locavore squid celiac gochujang. Deep v keytar occupy offal YOLO selvage brunch roof party cronut pabst readymade butcher. Palo santo keffiyeh you probably haven't heard of them, locavore tousled paleo cornhole green juice roof party pop-up. Drinking vinegar readymade pop-up intelligentsia godard coloring book gluten-free, wolf yr narwhal keffiyeh selfies direct trade church-key master cleanse. Hella trust fund microdosing succulents forage kickstarter swag actually.`
        }
        mount(<FilterOption {...filterOptionProps} />);
        cy.findByRole('button', {name: filterOptionProps.label}).click();
        
        // when
        cy.findByRole('button', {name: filterOptionProps.label}).click();

        // then
        cy.findByText(filterOptionProps.children).should('not.be.visible');
        cy.findByRole('button', {name: 'Apply'}).should('not.be.visible');
        cy.findByRole('button', {name: 'Clear'}).should('not.be.visible');
    })
})