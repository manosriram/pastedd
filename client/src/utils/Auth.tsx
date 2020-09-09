import { fetch_url } from "./";

const get_user = async (username: string) => {
    const url = `/u/${username}`;
    const response = await fetch_url(url, "GET");
    return response;
};

export default get_user;
