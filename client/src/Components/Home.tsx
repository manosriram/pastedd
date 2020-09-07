import { Paste } from "./";
import React, { useState, useEffect, useContext } from "react";
import { Input, LinkTag, TextArea } from "../Styled-Components";
import { fetch_url, is_user, languages_list } from "../utils/";
import "../Styles/App.css";
import { Button } from "@blueprintjs/core";
const mseconds = 3600000;

interface PasteForm {
    paste_syntax: string;
    paste_name: string;
    paste_content: string;
    paste_expiry_at: number;
    paste_type: string;
}

const Home = () => {
    const [user, set_user] = useState<boolean>(is_user());
    const [paste_id, set_paste_id] = useState<string>("");
    const [paste_form, set_paste_form] = useState<PasteForm>({
        paste_syntax: "Plaintext",
        paste_name: "",
        paste_content: "",
        paste_type: "",
        paste_expiry_at: mseconds
    });

    const submit_paste_form = async (e: any) => {
        try {
            e.preventDefault();
            const response = await fetch_url(
                "/p/create_paste",
                "POST",
                paste_form
            );
            if (response.success) set_paste_id(response.paste_id);
        } catch (e) {
            console.log(e);
        }
    };

    const handle_paste_form = async (e: any) => {
        set_paste_form({ ...paste_form, [e.target.name]: e.target.value });
    };

    if (paste_id) {
        return <Paste paste_id={paste_id} />;
    }

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

                    <label htmlFor="#languages">Syntax: </label>
                    {"   "}
                    <select
                        id="languages"
                        defaultValue="Plaintext"
                        name="paste_syntax"
                    >
                        {languages_list.map(lang => {
                            return <option value={lang}>{lang}</option>;
                        })}
                    </select>
                    {"  "}
                    <select
                        id="exposure"
                        defaultValue="public"
                        name="paste_type"
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
                        defaultValue="3600000"
                        name="paste_expiry_at"
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
        </>
    );
};

export default Home;
