import { fetch_url } from "./";

export const get_user = async () => {
    const response = await fetch_url("/u/current_user/", "GET");
    return response;
};
