import { lighten, saturate } from "polished";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import config from "../../utils/siteConfig";
import addToMailchimp from "gatsby-plugin-mailchimp";

export const SubscribeForm = ({ close, isOpen }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState();
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email) {
            const result = await addToMailchimp(email);
            if (result) {
                const { result: resultStatus, msg } = result;
                if (resultStatus === "error") setError(msg);
                else setSuccess(true);
            }
        }
    };
    const handleChangeEmail = (e) => {
        if (e.target && e.target.value) {
            setEmail(e.target.value);
        }
    };
    useEffect(() => {
        if (!isOpen) {
            setEmail("");
            setError();
            setSuccess(false);
        }
    }, [isOpen]);
    return (
        <>
            {error && <ErrorStyle>{error}</ErrorStyle>}
            <SubscribeFormStyles
                noValidate
                onSubmit={handleSubmit}
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                className="subscribe-form"
                target="_blank"
            >
                {/* This is required for the form to work correctly  */}

                <FormGroup className="form-group">
                    {success ? (
                        <SuccessStyle>Thank you for subscribing!</SuccessStyle>
                    ) : (
                        <SubscribeEmail
                            className="subscribe-email"
                            type="email"
                            name={config.mailchimpEmailFieldName}
                            id={config.mailchimpEmailFieldName}
                            placeholder="youremail@example.com"
                            onChange={handleChangeEmail}
                            value={email}
                        />
                    )}
                </FormGroup>

                {success ? (
                    <SubscribeFormButton onClick={close}>
                        <span>Close</span>
                    </SubscribeFormButton>
                ) : (
                    <SubscribeFormButton type="submit">
                        <span>Subscribe</span>
                    </SubscribeFormButton>
                )}
            </SubscribeFormStyles>
        </>
    );
};

const SuccessStyle = styled.span`
    font-size: 25px;
    padding: 15px 42px;
    color: #000;
    background: white;
    border-radius: 47px;
`;
const ErrorStyle = styled.span`
    display: block;
    color: #f05230;
    font-size: 18px;
    margin-bottom: 30px;
`;
const SubscribeFormStyles = styled.form`
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: 460px;

    @media (max-width: 500px) {
        flex-direction: column;

        .form-group {
            flex-direction: column;
            width: 100%;
        }
    }
`;

const SubscribeEmail = styled.input`
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

const SubscribeFormButton = styled.button`
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
  /* background: linear-gradient(
    color(var(--blue) whiteness(+7%)),
    color(var(--blue) lightness(-7%) saturation(-10%)) 60%,
    color(var(--blue) lightness(-7%) saturation(-10%)) 90%,
    color(var(--blue) lightness(-4%) saturation(-10%))
  ); */
  /* background: linear-gradient(
    ${lighten("0.07", colors.blue)},
    ${saturate("-0.1", lighten("-0.07", colors.blue))} 60%,
    ${saturate("-0.1", lighten("-0.07", colors.blue))} 90%,
    ${saturate("-0.1", lighten("-0.04", colors.blue))}
  ); */
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

const FormGroup = styled.div`
    @media (max-width: 500px) {
        width: 100%;
    }
`;
