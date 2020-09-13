import React, { useEffect, useState, useRef } from "react";
import { get_paste, fetch_url } from "../utils/";
import { useHistory, useParams } from "react-router-dom";
import { TextArea } from "../Styled-Components";
import {
    Position,
    Toaster,
    Spinner,
    Button,
    Icon,
    Tabs,
    Tab,
    Tag,
    Callout,
    Card
} from "@blueprintjs/core";
import "../Styles/App.css";
import moment from "moment";
import hljs from "highlight.js";
import { CodeHighlight } from "./CodeHighlighter.js";
import { Home } from "./";

const message_toast = Toaster.create({
    className: "ex",
    position: Position.TOP
});

function Paste(props: any) {
    const { paste_id } = useParams();
    const [paste, set_paste] = useState<any>({});
    const [rct, set_redirect] = useState<boolean>(false);
    const [spin, set_spin] = useState<boolean>(false);
    const [edit, set_edit] = useState<boolean>(false);
    const [user, set_user] = useState<any>(false);

    const get_current_user = async () => {
        const user = await fetch_url("/u/current_user", "GET");
        set_user(user.user);
    };

    const get_paste_on_start = async () => {
        const response = await get_paste(paste_id);
        console.log(response);
        if (response.success) {
            set_paste(response.paste);
        } else set_paste(null);
    };

    const update_code_syntax_highlighting = () => {
        document.querySelectorAll("pre code").forEach((block: any) => {
            console.log(block);
            hljs.highlightBlock(block);
        });
        set_spin(false);
    };

    const delete_pst = async () => {
        const response = await fetch_url(`/p/${paste.paste_id}`, "DELETE");
        if (response.success) props.history.push(`/u/${user.user_name}`);
        else
            message_toast.show({
                intent: "danger",
                message: response.message
            });
    };

    const delete_paste = (e: any) => {
        if (window.confirm("Are you sure you want to delete this paste?"))
            delete_pst();
    };

    const edit_paste = (e: any) => {
        props.history.push(`/edit/${paste.paste_id}`);
    };

    const clone_paste = async () => {
        await fetch_url("/p/create_paste/", "POST", {
            paste_syntax: paste.paste_syntax,
            paste_name: paste.paste_name,
            paste_content: paste.paste_content,
            paste_type: paste.paste_type,
            paste_expiry_at: paste.paste_expiry_at
        });
        props.history.push(`/u/${user.user_name}`);
    };

    useEffect(() => {
        set_spin(true);
        get_current_user();
        get_paste_on_start();
        update_code_syntax_highlighting();
    }, []);

    if (spin) return <Spinner className="spin" intent="primary" />;
    else if (paste === null) {
        return (
            <>
                <Card className="card" interactive={true}>
                    <h3>Paste not found.</h3>
                    <br />
                    <p>This paste may have expired or deleted by the user.</p>
                </Card>
            </>
        );
    } else {
        return (
            <>
                <div className="App">
                    <Callout>
                        {paste.paste_name}
                        <label id="hits" htmlFor="icon">
                            {paste.paste_hits} hits
                        </label>
                    </Callout>
                    <br />
                    <Callout>
                        <Tag intent="warning">{paste.paste_syntax}</Tag>
                        {"  "}
                        <Tag
                            id="tag-link"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    paste.paste_content
                                );
                                message_toast.show({
                                    intent: "success",
                                    message: "Paste copied to clipboard"
                                });
                            }}
                        >
                            copy
                        </Tag>
                        {"  "}
                        <Tag id="tag-link">print</Tag>
                        {user && user.user_name === paste.user && (
                            <>
                                {"  "}
                                <Tag id="tag-link" onClick={edit_paste}>
                                    edit
                                </Tag>
                                {"  "}
                                <Tag id="tag-link" onClick={delete_paste}>
                                    delete
                                </Tag>
                            </>
                        )}
                        {user && (
                            <>
                                {"  "}
                                <Tag id="tag-link" onClick={clone_paste}>
                                    clone
                                </Tag>
                            </>
                        )}
                    </Callout>
                    <br />
                    <CodeHighlight
                        className="paste-content"
                        language={paste.paste_syntax}
                    >
                        {paste.paste_content}
                    </CodeHighlight>
                </div>
                <div id="right">
                    <Callout title="Paste Stats" contentEditable={false}>
                        <Icon icon="console" /> {paste.paste_syntax}
                        <br />
                        <Icon icon="eye-open" /> {paste.paste_type}
                        <br />
                        <Icon icon="calendar" />{" "}
                        {moment(paste.paste_created_at).format(
                            "MMMM Do YYYY, h:mm:ss a"
                        )}
                        <br />
                        <Icon icon="stopwatch" />{" "}
                        {moment(paste.paste_expiry_at).format(
                            "MMMM Do YYYY, h:mm:ss a"
                        )}
                    </Callout>
                </div>
            </>
        );
    }
}

export default Paste;
