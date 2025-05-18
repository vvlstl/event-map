export function getJson(url: string, headers: any = {}) {
    const options = {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            ...headers,
        },
    };

    return requestJson(url, options);
}

export function postJson(url: string, data: any, headers: any = {}) {
    const options = {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            ...headers,
        },
        method: 'POST',
    };

    options['body'] = JSON.stringify(data);

    return requestJson(url, options);
}

async function requestJson(url: string, options: any) {
    let response: Response;

    try {
        response = await fetch(url, options);
    } catch (e) {
        return {success: false};
    }

    if (!response || !response.ok) {
        // chrome bug - devtools show empty response
        await response.text();

        return {success: false};
    }

    let data;

    try {
        data = await response.json();
    } catch (e) {
        return {success: false};
    }

    return data;
}
