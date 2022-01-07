import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { Viewport, Container } from "./Common";
import CookieConsent, { Cookies } from "react-cookie-consent";

import { Navigation } from ".";
import config from "../../utils/siteConfig";

// Styles
import "../../styles/app.css";
import styled from "styled-components";
import { SubscribeModal } from "../subscribe/SubscribeModal";

const HeaderStyle = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    color: #fff;
    background: var(--color-base);
    background-position: center;
    background-size: cover;
    @media (max-width: 500px) {
        & .subscribe-btn {
            display: none;
        }
    }
    .site-logo {
        height: 52px;
        width: 100px;
    }
`;
/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node;
    const twitterUrl = site.twitter
        ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
        : null;
    const facebookUrl = site.facebook
        ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`
        : null;

    const subscribe = useRef();

    const openModal = () => {
        if (subscribe.current) {
            subscribe.current.open();
        }
    };

    const onAcceptGdpr = () => setCookiesGdpr(true);
    const onDeclineGdpr = () => setCookiesGdpr(false);

    const setCookiesGdpr = (state) => {
        [
            "gatsby-gdpr-google-analytics",
            "gatsby-gdpr-google-tagmanager",
            "gatsby-gdpr-facebook-pixel",
        ].forEach((c) => Cookies.set(c, state));
    };
    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <script
                    data-ad-client="ca-pub-4136685072851855"
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                />
                <body className={bodyClass} />
            </Helmet>
            <Viewport>
                <SubscribeModal ref={subscribe} />
                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <HeaderStyle
                        style={{
                            ...(site?.coverImageSharp?.childImageSharp?.original
                                .src && {
                                backgroundImage: `url(${site.coverImageSharp.childImageSharp.original.src})`,
                            }),
                        }}
                    >
                        <Container>
                            <div className="site-mast">
                                <div className="site-mast-left">
                                    <Link to="/">
                                        {/* {site.logo ? (
                                            <img
                                                className="site-logo"
                                                src={site.logo}
                                                alt={site.title}
                                            />
                                        ) : ( */}
                                        <Img
                                            className="site-logo"
                                            fluid={
                                                site?.logoSharp?.childImageSharp
                                                    .fluid
                                            }
                                            alt={site.title}
                                            loading="eager"
                                            critical
                                        />
                                        {/* )} */}
                                    </Link>
                                </div>
                                <div className="site-mast-right">
                                    {site.twitter && (
                                        <a
                                            href={twitterUrl}
                                            className="site-nav-item"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                className="site-nav-icon"
                                                src="/images/icons/twitter.svg"
                                                alt="Twitter"
                                            />
                                        </a>
                                    )}
                                    {site.facebook && (
                                        <a
                                            href={facebookUrl}
                                            className="site-nav-item"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                className="site-nav-icon"
                                                src="/images/icons/facebook.svg"
                                                alt="Facebook"
                                            />
                                        </a>
                                    )}
                                    <a
                                        className="site-nav-item"
                                        href={`https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className="site-nav-icon"
                                            src="/images/icons/rss.svg"
                                            alt="RSS Feed"
                                        />
                                    </a>
                                    <SubscribeButton
                                        onClick={openModal}
                                        className="subscribe-btn"
                                    >
                                        Subscribe
                                    </SubscribeButton>
                                </div>
                            </div>
                            {isHome ? (
                                <div className="site-banner">
                                    <h1 className="site-banner-title">
                                        {site.title}
                                    </h1>
                                    <p className="site-banner-desc">
                                        {site.description}
                                    </p>
                                </div>
                            ) : null}
                            <nav className="site-nav">
                                <div className="site-nav-left">
                                    {/* The navigation items as setup in Ghost */}
                                    <Navigation
                                        data={site.navigation}
                                        navClass="site-nav-item"
                                    />
                                </div>
                                <div className="site-nav-right">
                                    <Link
                                        className="site-nav-button"
                                        to="/about"
                                    >
                                        About
                                    </Link>
                                </div>
                            </nav>
                        </Container>
                    </HeaderStyle>

                    <main className="site-main">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>
                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                <Link to="/">{site.title}</Link> © 2020 &mdash;
                                {/* Published with
                                <a
                                    className="site-foot-nav-item"
                                    href="https://ghost.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ghost
                                </a> */}
                            </div>
                            <div className="site-foot-nav-right">
                                <Navigation
                                    data={site.secondary_navigation}
                                    navClass="site-foot-nav-item"
                                />
                            </div>
                        </div>
                    </footer>
                </div>
            </Viewport>
            <CookieConsentWrapper>
                <CookieConsent
                    location="bottom"
                    buttonText="Accept"
                    declineButtonText="Decline"
                    cookieName="gatsby-gdpr-google-analytics"
                    onAccept={onAcceptGdpr}
                    onDecline={onDeclineGdpr}
                    enableDeclineButton
                >
                    <div className="cookies-title">
                        This website uses cookies!
                    </div>
                    <div className="cookies-body">
                        We inform you that this site uses own, technical and
                        third parties cookies to make sure our web page is
                        user-friendly and to guarantee a high functionality of
                        the webpage. By continuing to browse this website, you
                        declare to accept the use of cookies.
                    </div>
                </CookieConsent>
            </CookieConsentWrapper>
        </>
    );
};

const CookieConsentWrapper = styled.div`
    & > div {
        min-height: 40vh;
        opacity: 0.9;
        align-items: center !important;
        font-size: 2rem;
        @media (min-width: 500px) {
            font-size: 2.5rem;
        }

        line-height: 1.3em;
        .cookies-title {
            font-weight: bold;
            margin-bottom: 20px;
        }
        & > div:last-child {
            @media (max-width: 500px) {
                width: 100%;
                text-align: right;
                font-size: 2rem;
            }
            & button {
                padding: 10px !important;
            }
        }
    }
`;
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
};

const DefaultLayoutSettingsQuery = (props) => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                # file(relativePath: { eq: "stay_curious_white.png" }) {
                #     childImageSharp {
                #         fixed(width: 30, height: 30) {
                #             ...GatsbyImageSharpFixed
                #         }
                #     }
                # }
            }
        `}
        render={(data) => <DefaultLayout data={data} {...props} />}
    />
);

const SubscribeButton = styled.a`
    display: block;
    padding: 4px 10px;
    margin: 0 0 0 10px;
    border: #fff 1px solid;
    color: #fff;
    line-height: 1em;
    border-radius: 10px;
    opacity: 0.8;

    :hover {
        text-decoration: none;
        opacity: 1;
        cursor: pointer;
    }
`;

export default DefaultLayoutSettingsQuery;
