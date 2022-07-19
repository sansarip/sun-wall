import { Card, Colors, Elevation } from "@blueprintjs/core";
import styled from "styled-components";

const Article = styled.article`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: space-evenly;

    h1 {
        margin-top: 0rem;
        font-size: 1.5rem;
    }

    .article-preview_stats {
        display: flex;
        flex-direction: column;
    }
`;

const Preview: React.FC<Article.Preview> = ({ article: title, rank, views }) => {
    return <Card interactive={true} elevation={Elevation.ONE}>
        <Article>
            <h1>{title}</h1>
            <div className="article-preview_stats">
                <p>Views: {rank}</p>
                <p>Rank: {views}</p>
            </div>
        </Article>
    </Card>;
}

export default Preview;