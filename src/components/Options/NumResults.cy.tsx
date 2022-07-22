import { mount } from "cypress/react";
import NumResults from "./NumResults";
import { noop } from "lodash";

describe("NumResults", () => {
  it("The given value is displayed", () => {
    // given
    const value = 100;

    // when
    mount(<NumResults onSelect={noop} value={value} />);

    // then
    cy.findByRole("button").contains("" + value);
  });

  it("Given that the main button is clicked, when a value is selected, then the onSelect function should be called with the selected value", () => {
    // given
    const value = 100;
    const targetValue = 200;
    const onSelectSpy = cy.spy().as("onSelectSpy");
    mount(<NumResults onSelect={onSelectSpy} value={value} />);
    cy.findByRole("button").click();

    // when
    cy.findByText("" + targetValue).click();

    // then
    cy.get("@onSelectSpy").should("have.been.calledWith", targetValue);
  });
});
