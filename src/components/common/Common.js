import styled from "styled-components";
import Theme from "../../styles/theme";

export const Viewport = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
`;

export const Container = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 4vw;

    @media (max-width: ${Theme.breakpoints.xl}) {
        padding: 0 20px;
    }
`;

export const Grid = styled(Container)`
    display: grid;
    grid-template-columns: repeat(
        ${(props) => (props.columns ? props.columns : 3)},
        1fr
    );
    grid-gap: 30px;

    @media (max-width: ${Theme.breakpoints.sm}) {
        grid-template-columns: 1fr;
        padding: 0 20px;
    }
`;
