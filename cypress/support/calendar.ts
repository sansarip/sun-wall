import { monthNames } from "src/utils";

export const selectDate = (year: number, month: number, day: number) => {
  cy.get(".bp4-datepicker-year-select > select").select("" + year);
  cy.get(".bp4-datepicker-month-select > select").select(monthNames[month]);
  return cy
    .get('[tabindex="-1"] > .bp4-datepicker-day-wrapper')
    .contains("" + day)
    .click();
};
