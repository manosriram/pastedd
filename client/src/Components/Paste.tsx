import React, { useEffect, useState, useRef } from "react";
import { get_paste } from "../utils/";
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

const message_toast = Toaster.create({
    className: "ex",
    position: Position.TOP
});

function Paste(props: any) {
    const { paste_id } = useParams();
    const [paste, set_paste] = useState<any>({});
    const [spin, set_spin] = useState<boolean>(false);

    const get_paste_on_start = async () => {
        const response = await get_paste(paste_id);
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

    useEffect(() => {
        set_spin(true);
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
                        <Tag>print</Tag>
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
