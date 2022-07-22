import { getCode } from "country-list";
import { dateToYearMonthDay, getYesterday, padWithZero } from "src/utils";
import { AnyEventObject, assign, createMachine } from "xstate";

export type Context = {
  articles: Article.Preview[];
  countryName?: string;
};
type FetchArticles = (
  context: Context,
  event: AnyEventObject
) => () => Promise<Context>;
export type FetchArticlesEvent = {
  type: "FETCH";
  yearMonthDay: [number, number, number];
  countryName?: string;
};

const fetchArticles: FetchArticles =
  (_context, { yearMonthDay, countryName }) =>
  async () => {
    const [year, month, day] =
      yearMonthDay || dateToYearMonthDay(getYesterday());
    const apiUrl = countryName
      ? `https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${getCode(
          countryName
        )}/all-access/${year}/${padWithZero(month)}/${padWithZero(day)}`
      : `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${padWithZero(
          month + 1
        )}/${padWithZero(day)}`;
    const response = await fetch(apiUrl);
    if (!response.ok && response.status !== 404) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    return {
      articles: json?.items?.[0]?.articles ?? [],
      ...(countryName ? { countryName } : {}),
    };
  };

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEMBOAXAlgYwDZgAIAHVMAN0zAHdYA6AMzHWwAtMA7KAYggHt2wtDmV4BrQWix5CJcpRoMmrDlATDe2ZFn4BtAAwBdRKCK9Ymbe2MgAHogBsAFgCMtAMwBWDwE4ATI8dfAHZ7AA5HABoQAE9EAFpnew9aDzdw+197ez03N0TfAF8CqMkcfGJSCmo6RmY2Ti4wVFReVFoiXC16VoBbWlLpCrlqxTqVNXYRTUt9IyQQU3NLazsEYLdaby3QnL1fZ1Cd8KjYhAO9WiCgvXsgvPtPNz0PIpKMMplK+TpSWABXXDoWBcABiAFEACoAYQAEtZFhZMPwVohvBs9N5rrktjcPA9nCd4s5nBtUuFHCFHGiknpQq8QANyrIqgomi1UKDIbD4WZEcj5qsfEFaElQkkrr5fGkPASYohiRc8QFQm59mLnN5nvTGZ9hgp2LwAEpwAFAznQuHzBHLAXyja+UIeUJBZxeTWOwK+QkIVK0MUy4kHXya4LOIrFEAGiBwaw6oYsmpKepQHlLJFWW1nILJZ6hA5O7LeezOKXeuJ5dzFjyZbweDHBOsvCNx5nfWi-U3wK28m2gVb7Xy0CmhbxU3wyzHjssli45cJBNHXJIO7XvQatkZs1qpvkZvsOCt6IIOovORy07Meb2q5K1vR6Yk7BuOJtvKRMr4jA3G-6ArsmHt0xRBBy1oTIySuew0TcbwzzRada0uLIFTFXISyyVd311BMd17Wx4mCMCkjSSDoNgq85RAzJQiQ4sMQXdDvDpcMgA */
  createMachine(
    {
      schema: {
        context: {} as Context,
      },
      context: { articles: [] },
      initial: "fetching",
      states: {
        fetching: {
          // @ts-ignore
          invoke: {
            src: fetchArticles,
            onDone: [
              {
                actions: assign((context: Context, event) => ({
                  ...context,
                  ...event.data,
                })),
                cond: "num results >= 1",
                target: "results",
              },
              {
                actions: assign({ articles: [] }),
                cond: "no results",
                target: "noResults",
              },
            ],
            onError: [
              {
                target: "error",
              },
            ],
          },
        },
        results: {
          on: {
            FETCH: {
              target: "fetching",
            },
          },
        },
        error: {
          on: {
            FETCH: {
              target: "fetching",
            },
          },
        },
        noResults: {
          on: {
            FETCH: {
              target: "fetching",
            },
          },
        },
      },
      id: "article previews",
    },
    {
      guards: {
        "num results >= 1": (context, event) => {
          return event?.data?.articles?.length >= 1;
        },
        "no results": (context, event) => {
          return event?.data?.articles?.length === 0;
        },
      },
    }
  );

export default machine;
