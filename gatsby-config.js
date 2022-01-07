const path = require(`path`);

const config = require(`./src/utils/siteConfig`);
const generateRSSFeed = require(`./src/utils/rss/generate-feed`);

let ghostConfig;

try {
    ghostConfig = require(`./.ghost`);
} catch (e) {
    ghostConfig = {
        production: {
            apiUrl: process.env.GHOST_API_URL,
            contentApiKey: process.env.GHOST_CONTENT_API_KEY,
        },
    };
} finally {
    const { apiUrl, contentApiKey } =
        process.env.NODE_ENV === `development`
            ? ghostConfig.development
            : ghostConfig.production;

    if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
        throw new Error(
            `GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`
        ); // eslint-disable-line
    }
}

if (
    process.env.NODE_ENV === `production` &&
    config.siteUrl === `http://localhost:8000` &&
    !process.env.SITEURL
) {
    throw new Error(
        `siteUrl can't be localhost and needs to be configured in siteConfig. Check the README.`
    ); // eslint-disable-line
}

/**
 * This is the place where you can tell Gatsby which plugins to use
 * and set them up the way you want.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
 *
 */
module.exports = {
    siteMetadata: {
        siteUrl: config.siteUrl,
    },
    plugins: [
        {
            resolve: `gatsby-plugin-sharp`,
        },
        {
            resolve: `gatsby-transformer-rehype`,
            options: {
                filter: (node) =>
                    // this is an example (any node type can be selected)
                    node.internal.type === `GhostPost`,
                plugins: [
                    {
                        resolve: `gatsby-rehype-inline-images`,
                        // all options are optional and can be omitted
                        options: {
                            // all images larger are scaled down to maxWidth (default: maxWidth = imageWidth)
                            // maxWidth: 2000,
                            withWebp: true,
                            // disable, if you need to save memory
                            useImageCache: true,
                        },
                    },
                ],
            },
        },
        /**
         *  Content Plugins
         */
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `pages`),
                name: `pages`,
            },
        },
        // Setup for optimised images.
        // See https://www.gatsbyjs.org/packages/gatsby-image/
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `images`),
                name: `images`,
            },
        },
        // `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `jamify-source-ghost`,
            options:
                process.env.NODE_ENV === `development`
                    ? { ghostConfig: ghostConfig.development }
                    : { ghostConfig: ghostConfig.production },
        },
        /**
         *  Utility Plugins
         */
        {
            resolve: `gatsby-plugin-ghost-manifest`,
            options: {
                short_name: config.shortTitle,
                start_url: `/`,
                background_color: config.backgroundColor,
                theme_color: config.themeColor,
                display: `minimal-ui`,
                icon: `static/${config.siteIcon}`,
                legacy: true,
                query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
                feeds: [generateRSSFeed(config)],
            },
        },
        {
            resolve: `gatsby-plugin-advanced-sitemap`,
            options: {
                query: `
                {
                    allGhostPost {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostPage {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostTag {
                        edges {
                            node {
                                id
                                slug
                                feature_image
                            }
                        }
                    }
                    allGhostAuthor {
                        edges {
                            node {
                                id
                                slug
                                profile_image
                            }
                        }
                    }
                }`,
                mapping: {
                    allGhostPost: {
                        sitemap: `posts`,
                    },
                    allGhostTag: {
                        sitemap: `tags`,
                    },
                    allGhostAuthor: {
                        sitemap: `authors`,
                    },
                    allGhostPage: {
                        sitemap: `pages`,
                    },
                },
                exclude: [
                    `/dev-404-page`,
                    `/404`,
                    `/404.html`,
                    `/offline-plugin-app-shell-fallback`,
                ],
                createLinkInHead: true,
                addUncaughtPages: true,
            },
        },
        {
            resolve: `gatsby-plugin-styled-components`,
            options: {
                // displayName: false
            },
        },
        {
            resolve: "gatsby-plugin-mailchimp",
            options: {
                endpoint:
                    "https://dsdf.us17.list-manage.com/subscribe/post?u=a22e81650ffbcaa08df485e0c&amp;id=73b651b454", // string; add your MC list endpoint here; see instructions below
                timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
            },
        },
        {
            resolve: `gatsby-plugin-gdpr-cookies`,
            options: {
                googleAnalytics: {
                    trackingId: "UA-179516312-1", // leave empty if you want to disable the tracker
                    cookieName: "gatsby-gdpr-google-analytics", // default
                    anonymize: true, // default
                },
                googleTagManager: {
                    trackingId: "GTM-W4F36XH", // leave empty if you want to disable the tracker
                    cookieName: "gatsby-gdpr-google-tagmanager", // default
                    dataLayerName: "dataLayer", // default
                },
                facebookPixel: {
                    pixelId: "YOUR_FACEBOOK_PIXEL_ID", // leave empty if you want to disable the tracker
                    cookieName: "gatsby-gdpr-facebook-pixel", // default
                },
                // defines the environments where the tracking should be available  - default is ["production"]
                environments: ["production", "development"],
            },
        },

        {
            resolve: `gatsby-plugin-ghost-images`,
            options: {
                // An array of node types and image fields per node
                // Image fields must contain a valid absolute path to the image to be downloaded
                lookup: [
                    {
                        type: `GhostPost`,
                        imgTags: [`feature_image`],
                    },
                    {
                        type: `GhostPage`,
                        imgTags: [`feature_image`],
                    },
                    {
                        type: `GhostSettings`,
                        imgTags: [`cover_image`, `logo`],
                    },

                    {
                        type: `GhostTag`,
                        imgTags: [`feature_image`],
                    },
                ],
                // Additional condition to exclude nodes
                // Takes precedence over lookup
                exclude: (node) => node.ghostId === undefined,
                // Additional information messages useful for debugging
                verbose: true,
                // Option to disable the module (default: false)
                disable: false,
            },
        },
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-force-trailing-slashes`,
        `gatsby-plugin-offline`,
    ],
};
