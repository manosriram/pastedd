import React, { useEffect, useState } from "react";
import { get_paste } from "../utils/";
import { useHistory, useParams } from "react-router-dom";
import { TextArea } from "../Styled-Components";
import { Icon, Tabs, Tab, Tag } from "@blueprintjs/core";
import "../Styles/App.css";

function Paste(props: any) {
    const { paste_id } = useParams();
    const [paste, set_paste] = useState<any>({});

    const get_paste_on_start = async () => {
        const response = await get_paste(paste_id);
        if (response.success) set_paste(response.paste);
        else set_paste(null);
    };

    useEffect(() => {
        get_paste_on_start();
    }, []);

    if (paste === null) {
        return (
            <>
                <h3>Paste Not found.</h3>
            </>
        );
    }

    return (
        <div className="App">
            <Tag>{paste.paste_name}</Tag>
            <label id="hits" htmlFor="icon">{paste.paste_hits} hits</label>
            <TextArea readOnly={true} defaultValue={paste.paste_content} />
        </div>
    );
}

export default Paste;
