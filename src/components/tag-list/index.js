import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import slugify from "slugify";
import {
    StyledTag,
    StyledTagList,
    TagArchiveLink,
    TagArchiveLinkWrapper,
    TagContainer,
    TagIcon,
    TagListTitle,
    TagName,
} from "./style";

const TagList = () => {
    const data = useStaticQuery(
        graphql`
            query Tags {
                allGhostTag(filter: { slug: { ne: "data-schema" } }) {
                    nodes {
                        id
                        slug
                        feature_image
                        name
                        featureImageSharp {
                            childImageSharp {
                                original {
                                    src
                                }
                            }
                        }
                    }
                }
            }
        `
    );
    const tags = data?.allGhostTag?.nodes;

    return (
        <TagContainer>
            <TagListTitle>Featured Tags</TagListTitle>
            <StyledTagList>
                {tags.map((tag, index) => (
                    <StyledTag key={index}>
                        <Link
                            to={`/tag/${slugify(tag.slug, {
                                lower: true,
                            })}`}
                        >
                            <TagIcon
                                src={
                                    tag.featureImageSharp?.childImageSharp
                                        ?.original.src
                                }
                                alt={tag.name}
                            />
                            <TagName>{tag.name}</TagName>
                        </Link>
                    </StyledTag>
                ))}
            </StyledTagList>
            <TagArchiveLinkWrapper>
                <TagArchiveLink to={`/tags`}>See all tags</TagArchiveLink>
            </TagArchiveLinkWrapper>
        </TagContainer>
    );
};

export default TagList;
