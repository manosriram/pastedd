import { Paste, NewPastes } from "./";
import React, { useState, useEffect, useContext } from "react";
import { Input, LinkTag, TextArea } from "../Styled-Components";
import { fetch_url, is_user, languages_list } from "../utils/";
import "../Styles/App.css";
import { Button, Toaster, Position } from "@blueprintjs/core";
import Select from "react-select";

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

const Home = (props: any) => {
    const [user, set_user] = useState<boolean>(is_user());
    const [paste_id, set_paste_id] = useState<string>("");
    const [paste_form, set_paste_form] = useState<PasteForm>({
        paste_syntax: "",
        paste_name: "",
        paste_content: "",
        paste_type: "",
        paste_expiry_at: 3600000
    });

    useEffect(() => {
        set_paste_form({
            paste_syntax: "Plaintext",
            paste_name: "",
            paste_content: "",
            paste_type: "public",
            paste_expiry_at: 3600000
        });
    }, []);

    const submit_paste_form = async (e: any) => {
        try {
            e.preventDefault();
            const response = await fetch_url(
                "/p/create_paste",
                "POST",
                paste_form
            );
            console.log(response);
            if (response.success) {
                props.history.push(`/p/${response.paste_id}`);
            } else {
                message_toast.show({
                    intent: "danger",
                    message: response.message
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handle_paste_form = async (e: any) => {
        set_paste_form({ ...paste_form, [e.target.name]: e.target.value });
    };

    const handle_select_form = async (e: any) => {
        set_paste_form({
            ...paste_form,
            paste_syntax: e.value
        });
    };

    return (
        <>
            <div className="App">
                <h4>Create a Paste</h4>
                <form
                    action=""
                    onChange={handle_paste_form}
                    onSubmit={submit_paste_form}
                >
                    <TextArea name="paste_content" />
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
                        defaultValue="public"
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
                        required
                    />
                    <br />
                    <br />
                    <label htmlFor="">Expire After: </label>
                    {"   "}
                    <select
                        id="expiration"
                        name="paste_expiry_at"
                        defaultValue="3600000"
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
                    <Button icon="send-to" intent="success" type="submit">
                        Create Paste
                    </Button>
                </form>
            </div>
            <div id="latest-pastes">
                <NewPastes />
            </div>
        </>
    );
};

export default Home;
