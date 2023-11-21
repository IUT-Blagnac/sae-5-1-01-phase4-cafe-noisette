
export async function post(path: string, body: any, needsAuth?: boolean): Promise<Response> {
    const url = process.env.REACT_APP_API_URL + '/';
    const headersTemp: HeadersInit = needsAuth ? {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    } : {
        'Content-Type': 'application/json'
    }

    return fetch(url + path, {
        method: 'POST',
        headers: headersTemp,
        body: JSON.stringify(body),
    });
}

export async function get(path: string, needsAuth?: boolean): Promise<Response> {
    const url = process.env.REACT_APP_API_URL + '/';
    const headersTemp: HeadersInit = needsAuth ? {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    } : {}

    return fetch(url + path, {
        method: 'GET',
        headers: headersTemp,
    });

}

export async function put(path: string, body: any, needsAuth?: boolean): Promise<Response> {
    const url = process.env.REACT_APP_API_URL + '/';
    const headersTemp: HeadersInit = needsAuth ? {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    } : {
        'Content-Type': 'application/json'
    }

    return fetch(url + path, {
        method: 'PUT',
        headers: headersTemp,
        body: JSON.stringify(body),
    });

}

export async function del(path: string, needsAuth?: boolean): Promise<Response> {
    const url = process.env.REACT_APP_API_URL + '/';
    const headersTemp: HeadersInit = needsAuth ? {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    } : {}

    return fetch(url + path, {
        method: 'DELETE',
        headers: headersTemp,
    });
}
