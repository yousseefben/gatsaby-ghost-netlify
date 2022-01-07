import styled from "styled-components";
import { saturate, lighten } from "polished";

export const SuccessStyle = styled.span`
    font-size: 25px;
    padding: 15px 42px;
    color: #000;
    background: white;
    border-radius: 47px;
`;
export const ErrorStyle = styled.span`
    display: block;
    color: #f05230;
    font-size: 18px;
    margin-bottom: 30px;
`;
export const FormStyles = styled.form`
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: 460px;
    flex-wrap: wrap;
    & .fullwidth {
        flex-basis: 100%;
    }
    @media (max-width: 500px) {
        flex-direction: column;

        .form-group {
            flex-direction: column;
            width: 100%;
        }
    }
`;

export const CustomInput = styled.input`
    display: block;
    padding: 10px;
    width: 100%;
    /* border: color(var(--lightgrey) l(+7%)) 1px solid; */
    border: ${lighten("0.07", "#c5d2d9")} 1px solid;
    /* color: var(--midgrey); */
    color: #738a94;
    font-size: 1.8rem;
    line-height: 1em;
    font-weight: normal;
    user-select: text;
    border-radius: 5px;
    transition: border-color 0.15s linear;

    -webkit-appearance: none;

    :focus {
        outline: 0;
        /* border-color: color(var(--lightgrey) l(-2%)); */
        border-color: ${lighten("-0.02", "#738a94")};
    }
`;
export const CustomTextArea = styled.textarea`
    display: block;
    padding: 10px;
    width: 100%;
    /* border: color(var(--lightgrey) l(+7%)) 1px solid; */
    border: ${lighten("0.07", "#c5d2d9")} 1px solid;
    /* color: var(--midgrey); */
    color: #738a94;
    font-size: 1.8rem;
    line-height: 1em;
    font-weight: normal;
    user-select: text;
    border-radius: 5px;
    transition: border-color 0.15s linear;

    -webkit-appearance: none;

    :focus {
        outline: 0;
        /* border-color: color(var(--lightgrey) l(-2%)); */
        border-color: ${lighten("-0.02", "#738a94")};
    }
    min-height: 200px;
`;
export const FormButton = styled.button`
    position: relative;
    display: inline-block;
    margin: 0 0 0 10px;
    padding: 0 20px;
    height: 43px;
    outline: none;
    color: #fff;
    font-size: 1.5rem;
    line-height: 39px;
    font-weight: 400;
    text-align: center;

    background: linear-gradient(#4fb7f0, #29a0e0 60%, #29a0e0 90%, #36a6e2);
    border-radius: 5px;

    -webkit-font-smoothing: subpixel-antialiased;

    :active,
    :focus {
        /* background: color(var(--blue) lightness(-9%) saturation(-10%)); */
        background: ${saturate("-0.1", lighten("-0.09", "#3eb0ef"))};
    }
    @media (max-width: 500px) {
        margin: 10px 0 0 0;
        width: 100%;
    }

    @media (prefers-color-scheme: dark) {
        opacity: 0.9;
    }
`;

export const FormGroup = styled.div`
    margin-bottom: 30px;
    @media (max-width: 500px) {
        width: 100%;
    }
`;
