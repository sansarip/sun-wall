import { Card, Colors, Elevation } from "@blueprintjs/core";
import React from "react";
import { DARK } from "src/colors";
import styled from "styled-components";

const Link = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  article {
    align-items: center;
    color: ${(props) =>
        props.theme.color === DARK
          ? Colors.LIGHT_GRAY5
          : Colors.DARK_GRAY1};

    display: flex;
    gap: 1.5rem;
    justify-content: space-evenly;
    text-decoration: none;

    h1 {
      font-size: 1.125rem;
      margin-top: 0rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .article-preview_stats {
      display: flex;
      flex-direction: column;
    }

    @media only screen and (max-width: 600px) {
        h1 {
            max-width: 12rem;
        }
    }

    @media only screen and (min-width: 601px) {
        h1 {
            max-width: 18rem;
        }
    }
    
  }
`;

export const Preview: React.FC<
  Article.Preview & { style?: React.CSSProperties }
> = (props) => {
  const title = props.article?.replace(/_/g, " ");
  return (
    <Link
      href={`https://en.wikipedia.org/wiki/${props.article}`}
      rel="noreferrer"
      target="_blank"
    >
      <Card style={props.style} interactive={true} elevation={Elevation.ONE}>
        <article>
          <h1 title={title}>{title}</h1>
          <div className="article-preview_stats">
            <p>Views: {props.views || props.views_ceil}</p>
            <p>Rank: {props.rank}</p>
          </div>
        </article>
      </Card>
    </Link>
  );
};

export default Preview;
