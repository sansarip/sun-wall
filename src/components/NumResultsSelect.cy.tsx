import { mount } from "cypress/react";
import NumResultsSelect from "./NumResultsSelect";
import { noop } from "lodash";

describe("NumResultsSelect", () => {
  it("The given value is displayed", () => {
    // given
    const value = 100;

    // when
    mount(<NumResultsSelect onSelect={noop} value={100} />);

    // then
    cy.findByRole("button").contains("" + value);
  });

  it("Given that the main button is clicked, when a value is selected, then the onSelect function should be called with the selected value", () => {
    // given
    const value = 100;
    const targetValue = 200;
    const onSelectSpy = cy.spy().as("onSelectSpy");
    mount(<NumResultsSelect onSelect={onSelectSpy} value={value} />);
    cy.findByRole("button").click();

    // when
    cy.findByText("" + targetValue).click();

    // then
    cy.get("@onSelectSpy").should("have.been.calledWith", targetValue);
  });
});
