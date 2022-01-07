import React from "react";
import { Layout } from "../components/common";
import { graphql } from "gatsby";
// import Subheader from "../components/subheader";
import { Card } from "../components/common/card";
import slugify from "slugify";
import { Grid } from "../components/common/Common";
import Img from "gatsby-image";
import styled from "styled-components";
import { MetaData } from "../components/common/meta";

const TagSvgIcon = styled.img`
    max-height: 55px;
`;

const TagName = styled.p`
    margin: 0 !important;
`;

const TagsPage = ({ data, location }) => {
    const tags = data.allGhostTag.nodes;

    return (
        <Layout bigHeader={false}>
            <MetaData location={location} title={`Tags`} type={`Series`} />
            {/* <Subheader title={`Tags`} subtitle={`${tags.length} tags`} /> */}
            <Grid columns={6}>
                {tags.map((tag, index) => (
                    <Card
                        key={index}
                        path={`/tag/${slugify(tag.slug, { lower: true })}`}
                        compact={true}
                        style={{ textAlign: "center" }}
                    >
                        {tag.featureImageSharp && (
                            <Img
                                fixed={
                                    tag.featureImageSharp.childImageSharp.fixed
                                }
                                // alt={post.title}
                            />
                            // <TagSvgIcon
                            //     src={
                            //         tag.featureImageSharp.childImageSharp
                            //             .original.src
                            //     }
                            //     alt={tag.name}
                            // />
                        )}
                        <TagName>{tag.name}</TagName>
                    </Card>
                ))}
            </Grid>
        </Layout>
    );
};

export default TagsPage;

export const query = graphql`
    query {
        allGhostTag(filter: { slug: { ne: "data-schema" } }) {
            nodes {
                ...GhostTagFields
            }
        }
    }
`;
