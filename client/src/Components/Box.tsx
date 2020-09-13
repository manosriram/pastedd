import { Paste, NewPastes } from "./";
import React, { useState, useEffect, useContext } from "react";
import { Input, LinkTag } from "../Styled-Components";
import { fetch_url, is_user, languages_list } from "../utils/";
import "../Styles/App.css";
import {
    TextArea,
    Spinner,
    Button,
    Toaster,
    Position
} from "@blueprintjs/core";
import Select from "react-select";
import { withRouter } from "react-router-dom";

interface PasteForm {
    paste_syntax: string;
    paste_name: string;
    paste_content: string;
    paste_expiry_at: number;
    paste_type: string;
}

const message_toast = Toaster.create({
    className: "ex",
    position: Position.TOP
});

const Box = (props: any) => {
    const [user, set_user] = useState<boolean>(is_user());
    const [paste_id, set_paste_id] = useState<string>("");
    const [paste_form, set_paste_form] = useState<PasteForm>({
        paste_syntax: "",
        paste_name: "",
        paste_content: "",
        paste_type: "",
        paste_expiry_at: 3600000
    });
    const [spin, set_spin] = useState<boolean>(false);

    const set_props = async () => {
        if (props.paste_form) {
            set_paste_form({
                paste_syntax: props.paste_form.paste_syntax,
                paste_name: props.paste_form.paste_name,
                paste_content: props.paste_form.paste_content,
                paste_type: props.paste_form.paste_type,
                paste_expiry_at: props.paste_form.paste_expiry_at
            });
        } else {
            set_paste_form({
                paste_syntax: "Plaintext",
                paste_name: "Untitled",
                paste_content: "",
                paste_type: "public",
                paste_expiry_at: 3600000
            });
        }
    };

    useEffect(() => {
        set_spin(true);
        set_props();
        set_spin(false);
    }, []);

    const submit_paste_form = async (e: any) => {
        try {
            e.preventDefault();
            set_spin(true);
            const url = props.paste_form
                ? `/p/update_paste/${props.paste_form.paste_id}`
                : "/p/create_paste";
            const response = await fetch_url(url, "POST", paste_form);
            if (response.success) {
                props.history.push(`/p/${response.paste_id}`);
            } else {
                message_toast.show({
                    intent: "danger",
                    message: response.message
                });
            }
            set_spin(false);
        } catch (e) {
            console.log(e);
        }
    };

    const handle_paste_form = async (e: any) => {
        if (e.target.name === "paste_expiry_at") {
            e.target.value = parseInt(e.target.value);
        }
        set_paste_form({ ...paste_form, [e.target.name]: e.target.value });
    };

    const handle_select_form = async (e: any) => {
        set_paste_form({
            ...paste_form,
            paste_syntax: e.value
        });
    };

    if (spin) return <Spinner className="spin" intent="primary" />;

    return (
        <>
            <div className="App">
                <h4>Create a Paste</h4>
                <form
                    action=""
                    onChange={handle_paste_form}
                    onSubmit={submit_paste_form}
                >
                    <TextArea
                        id="paste-area"
                        defaultValue={paste_form.paste_content}
                        large={true}
                        intent="primary"
                        name="paste_content"
                    />
                    <br />
                    <br />
                    <Select
                        placeholder="Language Syntax"
                        name="paste_syntax"
                        id="select_form"
                        onChange={handle_select_form}
                        options={languages_list}
                    />
                    <hr />
                    <label htmlFor="">Paste Type: </label> {"   "}
                    <select
                        id="exposure"
                        name="paste_type"
                        defaultValue={paste_form.paste_type}
                    >
                        <option value="public">Public</option>;
                        <option value="private" disabled={!user}>
                            Private
                        </option>
                        <option value="unlisted">Unlisted</option>;
                    </select>
                    <br />
                    <br />
                    <label htmlFor="">Paste Name: </label>
                    {"   "}
                    <input
                        type="text"
                        placeholder="Paste Name"
                        name="paste_name"
                        defaultValue={paste_form.paste_name}
                    />
                    <br />
                    <br />
                    <label htmlFor="">Expire After: </label>
                    {"   "}
                    <select
                        id="expiration"
                        name="paste_expiry_at"
                        defaultValue={paste_form.paste_expiry_at}
                    >
                        <option value="3600000">1 Hour</option>;
                        <option value="21600000">6 Hours</option>;
                        <option value="43200000">12 Hours</option>;
                        <option value="86400000">1 Day</option>;
                        <option value="604800000">1 Week</option>;
                        <option value="2678400000">1 Month</option>;
                        <option value="16070400000">6 Months</option>;
                        <option value="31536000000">1 Year</option>;
                    </select>
                    <br />
                    <br />
                    <Button
                        text={props.paste_form ? "Edit Paste" : "Create Paste"}
                        icon="send-to"
                        intent="success"
                        type="submit"
                    ></Button>
                </form>
            </div>
        </>
    );
};

export default withRouter(Box);
