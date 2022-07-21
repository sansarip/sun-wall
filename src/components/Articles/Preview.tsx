import { Card as _Card, Elevation } from "@blueprintjs/core";
import React from "react";
import styled from "styled-components";

const Card = styled(_Card)`
  article {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: space-evenly;

    h1 {
      margin-top: 0rem;
      width: 12rem;
      font-size: 1.125rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .article-preview_stats {
      display: flex;
      flex-direction: column;
    }
  }
`;

const Preview: React.FC<Article.Preview & { style?: React.CSSProperties }> = ({
  article,
  rank,
  style,
  views,
}) => {
  const title = article?.replace(/_/g, " ");
  return (
    <Card style={style} interactive={true} elevation={Elevation.ONE}>
      <article>
        <h1 title={title}>{title}</h1>
        <div className="article-preview_stats">
          <p>Views: {rank}</p>
          <p>Rank: {views}</p>
        </div>
      </article>
    </Card>
  );
};

export default Preview;
