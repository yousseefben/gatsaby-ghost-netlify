import React, { useState } from "react";
import { Form, Input, Textarea, Button } from "./ContactFormStyles";
import axios from "axios";
import { ErrorStyle } from "../common/Form";

const ContactForm = () => {
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
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        setServerState({ submitting: true });
        axios({
            method: "post",
            url: process.env.CONTACT_URL,
            data: new FormData(form),
        })
            .then((r) => {
                handleServerResponse(true, "Thanks!", form);
            })
            .catch((r) => {
                handleServerResponse(
                    false,
                    r.response && r.response.data && r.response.data.error,
                    form
                );
            });
    };
    return (
        <>
            <Form validate onSubmit={handleOnSubmit}>
                {serverState.status && !serverState.status.ok && (
                    <ErrorStyle>{serverState.status.msg}</ErrorStyle>
                )}
                {serverState.status &&
                serverState.status.ok &&
                !serverState.submitting ? (
                    <span className="success-contact">
                        Thank You! <br /> Your message has been sent
                        successfully!
                    </span>
                ) : (
                    <>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name *"
                            required
                        />
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email *"
                        />

                        <Textarea
                            id="message"
                            name="message"
                            placeholder="Message *"
                            required
                            rows="5"
                        />
                        <Button id="submit" type="submit" value="Submit">
                            Submit
                        </Button>
                    </>
                )}
            </Form>
        </>
    );
};

export default ContactForm;
