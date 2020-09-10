import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";
import { Card, Callout, Tag } from "@blueprintjs/core";
import { fetch_url } from "../utils/";
import moment from "moment";

function Profile(props: any) {
    const [user, set_user] = useState<any>({
        created_at: undefined,
        email: undefined,
        is_banned: undefined,
        paste_count: {
            public_pcount: undefined,
            private_pcount: undefined,
            unlisted_pcount: undefined,
            pd_public_pcount: undefined,
            pd_private_pcount: undefined,
            pd_unlisted_pcount: undefined
        },
        per_day_session: undefined,
        tier: undefined,
        user_name: undefined
    });
    const [diff, set_diff] = useState<number>(0);
    const [user_pastes, set_user_pastes] = useState<any>([]);

    const get_user_pastes = async (username: string) => {
        const url = `/p/user/${username}`;
        const user_pastes = await fetch_url(url, "GET");
        console.log(user_pastes.pastes);
        set_user_pastes(user_pastes.pastes);
    };

    const get_user = async () => {
        const current_user = await fetch_url("/u/current_user", "GET");
        set_user(current_user.user);
        set_diff(moment().diff(current_user.user.created_at, "days"));
        return current_user.user.user_name;
    };

    useEffect(() => {
        const user_prof = async () => {
            const username = await get_user();
            get_user_pastes(username);
        };
        user_prof();
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

    return (
        <>
            <div id="stats">
                <Card>
                    <Callout>
                        <h4>
                            <strong>{user.user_name}'s Pastedd</strong>
                        </h4>
                        {"  "}
                        {diff === 0 ? (
                            <p>Joined today</p>
                        ) : (
                            <p>Joined {diff} days ago</p>
                        )}
                    </Callout>
                    <br />
                    <p>Public Pastes: {user.paste_count.public_pcount}</p>
                    <p>Private Pastes: {user.paste_count.private_pcount}</p>
                    <p>Unlisted Pastes: {user.paste_count.unlisted_pcount}</p>
                    <p>Email: {user.email}</p>
                    <p>Tier: {user.tier}</p>
                    <hr />

                    <p>
                        Private Pastes Remaining today:{" "}
                        {10 - user.paste_count.pd_private_pcount}
                    </p>
                    <p>
                        Unlisted Pastes Remaining today:{" "}
                        {20 - user.paste_count.pd_unlisted_pcount}
                    </p>
                    <br />
                </Card>
            </div>
            <div id="all-pastes">
                <table className="bp3-html-table .modifier">
                    <thead>
                        <tr>
                            <th>Paste Name</th>
                            <th>Created</th>
                            <th>Syntax</th>
                            <th>Expires</th>
                            <th>Hits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user_pastes.map((paste: any) => {
                            return (
                                <>
                                    <tr>
                                        <td
                                            id="paste_name"
                                            onClick={() =>
                                                props.history.push(
                                                    `/p/${paste.paste_id}`
                                                )
                                            }
                                        >
                                            {paste.paste_name}
                                        </td>
                                        <td>
                                            {moment().to(
                                                paste.paste_created_at
                                            )}
                                        </td>
                                        <td>{paste.paste_syntax}</td>
                                        <td>
                                            {moment().to(paste.paste_expiry_at)}
                                        </td>
                                        <td>{paste.paste_hits}</td>
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Profile;
