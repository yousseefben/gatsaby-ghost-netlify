import React from "react";
import axios from "axios";
import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";
import TitleAnnexe from "../components/common/TitleAnnexe";
import {
    ErrorStyle,
    FormStyles,
    FormGroup,
    SuccessStyle,
    CustomInput,
    FormButton,
    CustomTextArea,
} from "../components/common/Form";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { ContactForm } from "../components/contact";
const ContactPage = ({ location }) => {
    const metadata = {};

    const [serverState, setServerState] = useState({
        submitting: false,
        status: null,
    });

    const handleServerResponse = (ok, msg, form) => {
        setServerState({
            submitting: false,
            status: { ok, msg },
        });
        if (ok) {
            form.reset();
        }
    };

    return (
        <>
            <MetaData data={metadata} location={location} type="website" />

            <Layout>
                <div className="container">
                    <TitleAnnexe title="Contact Us" />
                    <ContactForm />
                </div>
            </Layout>
        </>
    );
};

const FormWrapper = styled.div`
    margin-top: 60px;
    & button {
        flex-basis: 100%;
        margin: 0;
    }

    & .success-contact {
        display: block;
        line-height: 4rem;
        text-align: center;
        margin-top: 70px;
        font-size: 2.5rem;
    }
`;

export default ContactPage;
