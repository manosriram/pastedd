import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";
import "../Styles/Responsive.css";
import { Spinner, Card, Callout, Icon } from "@blueprintjs/core";
import { fetch_url } from "../utils/";
import moment from "moment";
import { useParams, useLocation } from "react-router-dom";

function User(props: any) {
    const location = useLocation();
    const [diff, set_diff] = useState<number>(0);
    const [cu, set_cu] = useState<any>({});
    const [user_pastes, set_user_pastes] = useState<any>([]);
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
    const [spin, set_spin] = useState<boolean>(false);
    const [pu_count, set_pu_count] = useState<any>([]);
    const [nm, set_name] = useState<string>("");

    const get_user_pastes = async (name: string) => {
        const url = `/p/user/${name}`;
        const user_pastes = await fetch_url(url, "GET");
        set_user_pastes(user_pastes.pastes);
        set_pu_count(
            user_pastes.pastes.filter(
                (paste: any) =>
                    paste.paste_type === "private" &&
                    paste.paste_type === "unlisted"
            )
        );
    };

    const current_user = async () => {
        const cu = await fetch_url("/u/current_user", "GET");
        if (cu.user) set_cu(cu.user);
    };

    const get_user = async (name: string) => {
        try {
            const url = `/u/${name}`;
            const current_user = await fetch_url(url, "GET");
            if (!current_user.user) {
                set_user(null);
            }
            set_user(current_user.user);
            set_diff(moment().diff(current_user.user.created_at, "days"));
            return current_user.user.user_name;
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        set_spin(true);
        const user_prof = async () => {
            const name = location.pathname.split("/")[2];
            set_name(name);
            await current_user();
            await get_user(name);
            await get_user_pastes(name);
            set_spin(false);
        };
        user_prof();
    }, []);

    if (spin) return <Spinner className="spin" intent="primary" />;
    else if (user === null) {
        return (
            <>
                <Card className="user-card" interactive={true}>
                    <h4>User not found.</h4>
                </Card>
            </>
        );
    }

    return (
        <>
            <div id="stats">
                <Card>
                    <Callout>
                        <h4>
                            <strong>{user.user_name}'s Pastedd</strong>
                        </h4>
                        {"  "}
                        <Icon icon="calendar" />
                        {"  "}
                        {diff === 0 ? (
                            <span>Joined today</span>
                        ) : (
                            <>
                                <span>Joined {diff} days ago</span>
                            </>
                        )}
                    </Callout>
                    <br />
                    <p>
                        Public Pastes:{" "}
                        <strong>{user.paste_count.public_pcount}</strong>
                    </p>
                    <p>
                        Private Pastes:{" "}
                        <strong>{user.paste_count.private_pcount}</strong>
                    </p>
                    <p>
                        Unlisted Pastes:{" "}
                        <strong>{user.paste_count.unlisted_pcount}</strong>
                    </p>
                    <p>
                        Email:<strong> {user.email}</strong>
                    </p>
                    <p>
                        Tier: <strong>{user.tier}</strong>
                    </p>
                    <hr />
                    <p>
                        Pastes Remaining today:{" "}
                        <strong>
                            {40 -
                                (user.paste_count.pd_private_pcount +
                                    user.paste_count.pd_public_pcount +
                                    user.paste_count.pd_unlisted_pcount)}
                        </strong>
                        <br />
                        <strong>
                            (Renews {moment(user.next_renew).calendar()})
                        </strong>
                    </p>

                    <p>Private and Unlisted pastes are only visible to you.</p>
                    <br />
                </Card>
            </div>
            {!(user_pastes.length - pu_count.length && cu.user_name === nm) ? (
                <Card interactive={true} id="no-paste">
                    No live pastes.
                </Card>
            ) : (
                <div id="all-pastes">
                    <table className="bp3-html-table .modifier">
                        <thead>
                            <tr>
                                <th id="pn">Paste Name</th>
                                <th id="cr">Created</th>
                                <th id="sy">Syntax</th>
                                <th id="ex">Expires</th>
                                <th id="ht">Hits</th>
                            </tr>
                        </thead>
                        <tbody id="paste-table">
                            {user_pastes.map((paste: any) => {
                                if (
                                    cu.user_name !== paste.user &&
                                    (paste.paste_type === "private" ||
                                        paste.paste_type === "unlisted")
                                )
                                    return <></>;
                                else {
                                    return (
                                        <>
                                            <tr>
                                                <td
                                                    id="paste_name"
                                                    className="pn"
                                                    onClick={() =>
                                                        props.history.push(
                                                            `/p/${paste.paste_id}`
                                                        )
                                                    }
                                                >
                                                    {paste.paste_type ===
                                                        "private" && (
                                                        <Icon
                                                            className="lock"
                                                            icon="lock"
                                                        />
                                                    )}
                                                    {"  "}
                                                    {paste.paste_name.length >
                                                    15
                                                        ? paste.paste_name.substr(
                                                              0,
                                                              5
                                                          ) + "..."
                                                        : paste.paste_name}
                                                </td>
                                                <td id="cr">
                                                    {moment().to(
                                                        paste.paste_created_at
                                                    )}
                                                </td>
                                                <td id="sy">
                                                    {paste.paste_syntax}
                                                </td>
                                                <td id="ex">
                                                    {moment().to(
                                                        paste.paste_expiry_at
                                                    )}
                                                </td>
                                                <td id="ht">
                                                    {paste.paste_hits}
                                                </td>
                                            </tr>
                                        </>
                                    );
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default User;
