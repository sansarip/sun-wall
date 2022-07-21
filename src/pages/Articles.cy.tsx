import { mount } from "cypress/react";
import { selectDate } from "../../cypress/support/calendar";
import { format } from "date-fns";
import { dateToYearMonthDay, getYesterday, padWithZero } from "src/utils";
import Articles from "./Articles";
import { selectableNumbers } from "src/components/NumResultsSelect";
import { RouteHandler } from "cypress/types/net-stubbing";

const expectUrlToContainDate = (
  url: string,
  year: number,
  month: number,
  day: number
) => {
  return expect(url).to.contains(
    `${year}/${padWithZero(month + 1)}/${padWithZero(day)}`
  );
};

const interceptGet = (
  handler: RouteHandler = {
    fixture: "topPageViews20220719.json",
  }
) =>
  cy
    .intercept(
      { method: "GET" },
      handler
    )
    .as("getTopPageViews");

describe("Articles", () => {
  it("When the page is loading, then the loading indicator should be visible and the options should be disabled", () => {
    interceptGet((_) => {
      cy.findByText(/fetching results/i).should("be.visible");
      cy.get("button[disabled]").should("have.length", 2);      
    });
    mount(<Articles />);
  });

  it("When an unexpected HTTP error status is received, then the error message should be visible", () => {
    // given
    interceptGet((req) => {
        req.reply(500);
    })
    mount(<Articles />);

    // when
    cy.wait("@getTopPageViews");

    // then
    cy.findByText(/oops! encountered an error/i).should("be.visible");
  })

  it("Yesterday's top page views should be fetched for", () => {
    // given
    interceptGet();
    const [year, month, day] = dateToYearMonthDay(getYesterday());
    mount(<Articles />);

    // when
    cy.wait("@getTopPageViews").then(({ request: { url }, response }) => {
      // then
      expectUrlToContainDate(url, year, month, day);
      cy.findByText(
        response?.body?.items?.[0]?.articles?.[0]?.article.replace(/_/g, " ")
      ).should("be.visible");
    });
  });

  it("The number of displayed results should be less than any of the selectable-number-of-results options", () => {
    // given
    interceptGet();
    const leastSelectableNumber = selectableNumbers.sort()[0];
    mount(<Articles />);

    // when
    cy.wait("@getTopPageViews");

    // then
    cy.get(".bp4-card").should("have.length.lessThan", leastSelectableNumber);
  });

  it("Given that yesterday's top page views are fetched and I've selected a new date, when I click apply, then the results for the selected date are fetched", () => {
    // given
    interceptGet();
    const yesterday = getYesterday();
    const formatted = format(yesterday, "MMM dd, yyyy");
    const [year, month, day] = [2021, 9, 16];
    mount(<Articles />);
    cy.wait("@getTopPageViews");
    cy.findByRole("button", { name: formatted }).click();
    selectDate(year, month, day);

    // when
    cy.findByRole("button", { name: "Apply" }).click();

    // then
    cy.wait("@getTopPageViews").then(({ request: { url } }) => {
      expectUrlToContainDate(url, year, month, day);
    });
  });

  // FIXME: This test won't work as expected because react-window, ofc, won't display all the results at once
  xit("Given that yesterday's top page views are fetched and the num-results-select is open, when I select the number of results, then only the selected number of results are displayed", () => {
    // given
    interceptGet();
    mount(<Articles />);
    cy.wait("@getTopPageViews");
    cy.get("button").contains("results").click();

    for (const n of selectableNumbers) {
      // when
      cy.findByText("" + n).click();

      // then
      cy.get(".bp4-card").should("have.length", n);
    }
  });
});
