import React, { useEffect, useState } from "react";
import { get_paste } from "../utils/";
import { useHistory, useParams } from "react-router-dom";

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
            <h1>{paste.paste_name}</h1>
        </div>
    );
}

export default Paste;
