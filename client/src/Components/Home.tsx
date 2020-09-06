import React, { useEffect } from "react";
import { Input, Button, LinkTag, TextArea } from "../Styled-Components";
import { fetch_url, is_user, languages_list } from "../utils/";
import "../Styles/App.css";

function Home() {
    const [is_logged, set_is_user] = React.useState<any>(false);

    useEffect(() => {
        set_is_user(is_user());
    }, []);

    return (
        <>
        <div className="App">
            <h4>Create a Paste</h4>
            <form action="">
                <TextArea />
                <br />
                <br />
                
                <label htmlFor="#languages">Syntax: </label>
                {"   "}
                <select
                    id="languages"
                    name="languages"
                    defaultValue="Plaintext"
                >
                    {languages_list.map(lang => {
                        return <option value={lang}>{lang}</option>;
                    })}
                </select>
                {"  "}
                <select id="exposure" name="exposure" defaultValue="public">
                    <option value="public">Public</option>;
                    <option value="private" disabled={is_logged}>
                        Private
                    </option>
                    <option value="unlisted">Unlisted</option>;
                </select>
                <br />
                <br />

                <label htmlFor="">Paste Name: </label>
                {"   "}
                <input type="text" placeholder="Paste Name" required />
                <br />
                <br />
                <label htmlFor="">Expire After: </label>
                {"   "}
                <select
                    id="expiration"
                    name="expiration"
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
                <Button type="submit">Create Paste</Button>
            </form>
        </div>
</>
    );
}

export default Home;
