import React from "react";
import { fetch_url } from "../utils/";
import { useLocation } from "react-router-dom";

function Raw(props: any) {
    const location = useLocation();

    const get_paste = async () => {
        const response = await fetch_url(
            `/p/${location.pathname.split("/")[3]}`,
            "GET"
        );
        if (response.paste) document.write(response.paste.paste_content);
        else props.history.push("/");
    };

    React.useEffect(() => {
        get_paste();
    }, []);

    return <></>;
}

export default Raw;
