import React from "react";
import PropTypes from "prop-types";
import RehypeReact from "rehype-react";
import Img from "gatsby-image";

const RenderAst = ({ html }) => {
    const ImgSharpInline = ({ parentClassName, className, fluidImg, alt }) => (
        <Img
            className={className}
            fluid={fluidImg && JSON.parse(fluidImg)}
            alt={alt}
        />
    );

    const renderAst = new RehypeReact({
        Fragment: React.Fragment,
        createElement: React.createElement,
        components: { "img-sharp-inline": ImgSharpInline },
    }).Compiler;
    return <div>{renderAst(html)}</div>;
};

RenderAst.propTypes = {};

export default RenderAst;
