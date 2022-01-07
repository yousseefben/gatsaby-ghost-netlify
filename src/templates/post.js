import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";
import { SubscribeForm } from "../components/subscribe/SubscribeForm";
import TagList from "../components/tag-list";
import { Subscribe } from "../components/subscribe/Subscribe";
import styled from "styled-components";
import Img from "gatsby-image";
import RenderAst from "../components/common/RenderAst";
/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
    const post = data.ghostPost;
    // console.log(post.html.split("<div class='split' />"));
    // console.log(post);
    return (
        <>
            <MetaData data={data} location={location} type="article" />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        {post.featureImageSharp ? (
                            <figure className="post-feature-image">
                                <Img
                                    className="site-logo"
                                    fluid={
                                        post.featureImageSharp.childImageSharp
                                            .fluid
                                    }
                                    alt={post.title}
                                />
                                {/* <img
                                    src={post.feature_image}
                                    alt={post.title}
                                /> */}
                            </figure>
                        ) : null}
                        <div style={{ textAlign: "right" }}>
                            {post.published_at_pretty}
                        </div>
                        <section className="post-full-content">
                            <h1 className="content-title">{post.title}</h1>
                            {/* The main post content */}

                            <section className="content-body load-external-scripts">
                                <RenderAst
                                    html={post.childHtmlRehype.htmlAst}
                                />
                            </section>
                            {/* <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${location.href}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="/images/icons/facebook.svg"
                                    alt="Facebook"
                                />
                            </a> */}
                            <Subscribe />
                            {post.tags && post.tags.length > 0 && (
                                <PostTagsWrapper>
                                    <div>Tags: </div>
                                    <div className="post-tags">
                                        {post.tags.map((t) => (
                                            <Link
                                                key={t.slug}
                                                to={`/tag/${t.slug}`}
                                            >
                                                {t.name}
                                            </Link>
                                        ))}
                                    </div>
                                </PostTagsWrapper>
                            )}
                        </section>
                    </article>
                </div>
                <TagList />
            </Layout>
        </>
    );
};

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default Post;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`;

const PostTagsWrapper = styled.div`
    display: flex;
    @media (max-width: 500px) {
        flex-direction: column;
    }

    & .post-tags {
        @media (min-width: 500px) {
            padding-left: 10px;
        }
        a {
                padding-right: 10px;
            }
        }
    }
`;
