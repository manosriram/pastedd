import { fetch_url } from "./";

const get_user = async () => {
    const response = await fetch_url("/u/current_user/", "GET");
    return response;
};

export default get_user;
