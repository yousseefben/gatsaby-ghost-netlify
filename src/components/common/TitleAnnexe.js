import React from "react";
import styled from "styled-components";

const TitleAnnexe = ({ title }) => (
    <TitleAnnexeWrapper>
        <div className="title-annexe">{title}</div>
        <hr />
    </TitleAnnexeWrapper>
);

const TitleAnnexeWrapper = styled.div`
    text-align: center;
    & .title-annexe {
        margin-top: 0.8em;
        font-size: 5rem;
        font-weight: 700;
        @media (max-width: 500px) {
            margin-top: 0.8em;
            font-size: 3.4rem;
        }
    }
    & hr {
        width: 60px;
        margin: auto;
        margin-top: 30px;
        border-top: 3px solid #e3e9ed;
    }
`;

export default TitleAnnexe;
