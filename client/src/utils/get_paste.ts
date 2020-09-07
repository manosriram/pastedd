import { fetch_url } from "./";

const get_paste = async (paste_id: string) => {
    const url = `/p/${paste_id}`;
    const response = await fetch_url(url, "GET");
    console.log(response);
    return response;
};

export default get_paste;
