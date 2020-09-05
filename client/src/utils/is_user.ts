import { fetch_url } from "./";

async function is_user() {
    const is_user = await fetch_url("/u/current_user", "GET", null);
    return is_user === null;
}

export default is_user;
