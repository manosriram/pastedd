import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetch_url } from "../utils";
import { Box } from "./";

function Edit(props: any) {
    const location = useLocation();
    const [edit, set_edit] = useState<boolean>(false);
    const [paste, set_paste] = useState<any>({});

    const get_paste_to_edit = async () => {
        const looc = location.pathname.split("/")[2];
        const paste = await fetch_url(`/p/${looc}`, "GET");
        if (paste.success) {
            set_paste(paste.paste);
            set_edit(true);
        }
    };

    useEffect(() => {
        get_paste_to_edit();
    }, []);

    if (edit) return <Box paste_form={paste} />;
    else {
        return (
            <div className="App">
                This paste has expired or deleted by its user.
            </div>
        );
    }
}

export default Edit;
