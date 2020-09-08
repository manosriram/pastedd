import React, { useEffect, useState } from "react";
import { get_paste } from "../utils/";
import { useHistory, useParams } from "react-router-dom";
import { TextArea } from "../Styled-Components";
import { Icon, Tabs, Tab, Tag, Callout, Card } from "@blueprintjs/core";
import "../Styles/App.css";
import moment from "moment";
import hljs from "highlight.js";
import { CodeHighlight } from "./CodeHighlighter.js";

function Paste(props: any) {
    const { paste_id } = useParams();
    const [paste, set_paste] = useState<any>({});

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
    };

    useEffect(() => {
        get_paste_on_start();
        update_code_syntax_highlighting();
    }, []);

    if (paste === null) {
        return (
            <>
                <h3>Paste Not found.</h3>
            </>
        );
    }

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
                <CodeHighlight language={paste.paste_syntax}>
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

export default Paste;
