import { Colors, NonIdealState, Spinner } from "@blueprintjs/core";
import { useMachine } from "@xstate/react";
import machine from "./Articles.fsm";
import { Options } from "src/components";
import { Preview } from "src/components/Articles";
import styled from "styled-components";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useState } from "react";
import { SelectableNumber } from "src/components/Options";

const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: hidden;
`;

const OptionsContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
  height: 8vh;
  padding: 0px 0.25rem;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 82vh;

  .bp4-non-ideal-state {
    padding-top: 3rem;
    height: auto;
  }
`;

const Item = styled.div`
  padding: 1rem 0.1rem 0.1rem 0.1rem;
`;

const List = styled(FixedSizeList)`
  border-top: 1px solid ${Colors.LIGHT_GRAY2};
`;

export const Articles: React.FC = () => {
  const [state, send] = useMachine(machine);
  const [numArticles, setNumArticles] = useState<SelectableNumber>(100);
  const articles = state.context.articles as Article.Preview[];
  const isLoading = state.matches("fetching");

  const applyDate = (year: number, month: number, day: number) =>
    send({ type: "FETCH", yearMonthDay: [year, month, day] });

  let content;
  if (isLoading) {
    content = <NonIdealState icon={<Spinner />} title="Fetching results" />;
  } else if (state.matches("noResults")) {
    content = <NonIdealState icon="search" title="No results found" />;
  } else if (state.matches("error")) {
    content = <NonIdealState icon="error" title="Oops! Encountered an error" />;
  } else if (state.matches("results")) {
    content = (
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={numArticles}
            itemSize={125}
            width={width}
          >
            {({ index, style }) => (
              <Item style={style}>
                <Preview key={articles[index]?.article} {...articles[index]} />
              </Item>
            )}
          </List>
        )}
      </AutoSizer>
    );
  }

  return (
    <Main>
      <OptionsContainer>
        <Options.Calendar disabled={isLoading} onApply={applyDate} />
        <Options.NumResults
          disabled={isLoading}
          onSelect={(number: SelectableNumber) => setNumArticles(number)}
          value={numArticles}
        />
      </OptionsContainer>
      <Content>{content}</Content>
    </Main>
  );
};

export default Articles;
