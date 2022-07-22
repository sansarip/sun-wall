import { mount } from "cypress/react";
import Countries from "./Countries";
import { noop } from "lodash";
import { getName } from "country-list";

describe("Countries", () => {
  it("The given value is displayed", () => {
    // given
    const value = getName("US");

    // when
    mount(<Countries onSelect={noop} value={"" + value} />);

    // then
    cy.findByRole("button").contains("" + value);
  });

  it("Given that the main button is clicked, when a value is selected, then the onSelect function should be called with the selected value", () => {
    // given
    const value = getName("US");
    const targetValue = getName("CH")
    const onSelectSpy = cy.spy().as("onSelectSpy");
    mount(<Countries onSelect={onSelectSpy} value={"" + value} />);
    cy.findByRole("button").click();

    // when
    cy.findByText("" + targetValue).click();

    // then
    cy.get("@onSelectSpy").should("have.been.calledWith", targetValue);
  });
});
