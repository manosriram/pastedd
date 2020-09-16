import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";
import { Spinner, Card } from "@blueprintjs/core";
import { fetch_url } from "../utils/";
import moment from "moment";
import { useLocation } from "react-router-dom";

function Profile(props: any) {
    const location = useLocation();
    const [un, set_un] = useState<string>("");
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
    const [spin, set_spin] = useState<boolean>(false);

    const get_user = async () => {
        try {
            let url = "/u/current_user";
            if (un) url = `/u/${un}`;
            const current_user = await fetch_url(url, "GET");
            if (!current_user.user) {
                set_user(null);
                return null;
            } else {
                set_user(current_user.user);
                set_diff(moment().diff(current_user.user.created_at, "days"));
                return current_user.user.user_name;
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        set_spin(true);
        const user_name = location.pathname.split("/")[2];
        set_un(user_name);
        const user_prof = async () => {
            const username = await get_user();
            if (username) props.history.push(`/u/${username}`);
            else props.history.push("/");
        };
        user_prof();
        set_spin(false);
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

    if (spin) return <Spinner />;
    else if (user === null) {
        return (
            <>
                <Card className="user-card" interactive={true}>
                    <h4>User not found.</h4>
                </Card>
            </>
        );
    } else {
        return <h4>Profile</h4>;
    }
}

export default Profile;
