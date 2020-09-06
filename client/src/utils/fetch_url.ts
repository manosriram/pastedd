async function fetch_url(url: string, method: string, body: any = null) {
    const response = await fetch(url, {
        method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : null
    });
    const json_response = await response.json();
    return json_response;
}

export default fetch_url;
