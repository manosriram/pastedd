import React, { useEffect, useState } from "react";
import { get_user } from "../utils";

function Profile() {
    const [user, set_user] = useState<any>({});

    const show_user = async () => {
        const response = await get_user();
        set_user(response.user);
        console.log(user);
    };

    useEffect(() => {
        show_user();
    }, []);

    return (
        <>
            <h1>{user.user_name}</h1>
        </>
    );
}

export default Profile;
