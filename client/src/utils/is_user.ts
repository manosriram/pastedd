import { fetch_url } from "./";
import Cookie from "js-cookie";

function is_user() {
    const user = Cookie.get("express:sess") !== undefined;
    return user;
}

export default is_user;
