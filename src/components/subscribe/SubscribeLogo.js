import { graphql, StaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";
import config from "../../utils/siteConfig";

const SubscribeLogo = () => (
    <StaticQuery
        query={graphql`
            query SubscribeOverlayLogo {
                logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
                    childImageSharp {
                        # Specify the image processing specifications right in the query.
                        # Makes it trivial to update as your page's design changes.
                        fixed(quality: 100, width: 500) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={(data) => {
            if (!data.logo) {
                return;
            }

            return (
                <SubscribeOverlayLogo
                    className="subscribe-overlay-logo"
                    src={data.logo.childImageSharp.fixed.src}
                    alt={config.title}
                />
            );
        }}
    />
);

const SubscribeOverlayLogo = styled.img`
    position: fixed;
    top: 23px;
    left: 30px;
    height: 30px;
`;

export default SubscribeLogo;
