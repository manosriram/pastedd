import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";
import { Card } from "@blueprintjs/core";
import { fetch_url } from "../utils/";

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

    const get_user = async () => {
        const current_user = await fetch_url("/u/current_user", "GET");
        set_user(current_user.user);
    };

    useEffect(() => {
        get_user();
        console.log(user);
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
            <div id="user-info">Your Stats:</div>
            <Card>
                {user.user_name}
                {user.created_at}
                <br />
                {user.paste_count.public_pcount}
            </Card>
        </>
    );
}

export default Profile;
