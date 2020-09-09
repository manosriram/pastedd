import React, { useEffect, useState } from "react";
import { fetch_url, get_user } from "../utils";
import { Card, Button, Elevation } from "@blueprintjs/core";
import { useParams } from "react-router-dom";
import { User } from "./";
import "../Styles/Profile.css";

function Profile(props: any) {
    const [user, set_user] = useState<any>({});
    const [username, set_name] = useState<string>("");
    const { user_name } = useParams();

    const show_user = async () => {
        const current_user = await get_user(user_name);
        console.log(current_user);
    };

    const current_user = async () => {
        const user = await fetch_url("/u/current_user", "GET");
        if (user) {
            const user_name = user.user.user_name;
            set_name(user_name);
        }
    };

    useEffect(() => {
        if (user_name) {
            show_user();
        } else {
            current_user();
        }
    }, []);

    /*
       tbody
        tr
         td
         td
         td
        /tr
       /tbody
    */

    if (username) {
        return <User username={username} />;
    } else {
        return (
            <>
                <div id="pastes">
                    <table
                        id="paste-table"
                        className="bp3-html-table .modifier"
                    >
                        <thead>
                            <tr>
                                <th>Paste</th>
                                <th>Created</th>
                                <th>Hits</th>
                                <th>Expires</th>
                                <th>Syntax</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Blueprint</td>
                                <td>CSS framework and UI toolkit</td>
                                <td>Sass, TypeScript, React</td>
                                <td>Sass, TypeScript, React</td>
                            </tr>
                            <tr>
                                <td>TSLint</td>
                                <td>Static analysis linter for TypeScript</td>
                                <td>TypeScript</td>
                                <td>Sass, TypeScript, React</td>
                            </tr>
                            <tr>
                                <td>Plottable</td>
                                <td>
                                    Composable charting library built on top of
                                    D3
                                </td>
                                <td>SVG, TypeScript, D3</td>
                                <td>Sass, TypeScript, React</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default Profile;
