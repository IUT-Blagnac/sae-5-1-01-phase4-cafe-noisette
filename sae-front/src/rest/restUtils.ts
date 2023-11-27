import ApiResponse from "./ApiResponse";

export async function post<B, R>(path: string, body: B, needsAuth?: boolean): Promise<ApiResponse<R>> {
    const url = process.env.REACT_APP_API_URL + '/';
    const headersTemp: HeadersInit = needsAuth ? {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    } : {
        'Content-Type': 'application/json'
    }

    const request = await fetch(url + path, {
        method: 'POST',
        headers: headersTemp,
        body: JSON.stringify(body),
    });

    if (request.ok) {
        const response = await request.json();
        return {
            data: response as R,
            errorMessage: undefined,
            responseCode: request.status,
        };
    } else {
        const errorText = await request.text();
        return {
            data: undefined,
            errorMessage: errorText,
            responseCode: request.status,
        };
    }
}

export async function get<R>(path: string, needsAuth?: boolean): Promise<ApiResponse<R>> {
    const url = process.env.REACT_APP_API_URL + '/';
    const headersTemp: HeadersInit = needsAuth ? {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    } : {}

    const request = await fetch(url + path, {
        method: 'GET',
        headers: headersTemp,
    });

    if (request.ok) {
        const response = await request.json();

        return {
            data: response as R,
            errorMessage: undefined,
            responseCode: request.status,
        };
    } else {
        const errorText = await request.text();
        return {
            data: undefined,
            errorMessage: errorText,
            responseCode: request.status,
        };
    }
}

export async function put<B, R>(path: string, body: B, needsAuth?: boolean): Promise<ApiResponse<R>> {
    const url = process.env.REACT_APP_API_URL + '/';
    const headersTemp: HeadersInit = needsAuth ? {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    } : {
        'Content-Type': 'application/json'
    }

    const request = await fetch(url + path, {
        method: 'PUT',
        headers: headersTemp,
        body: JSON.stringify(body),
    });

    if (request.ok) {
        const response = await request.json();
        return {
            data: response as R,
            errorMessage: undefined,
            responseCode: request.status,
        };
    } else {
        const errorText = await request.text();
        return {
            data: undefined,
            errorMessage: errorText,
            responseCode: request.status,
        };
    }
}

export async function del<R>(path: string, needsAuth?: boolean): Promise<ApiResponse<R>> {
    const url = process.env.REACT_APP_API_URL + '/';
    const headersTemp: HeadersInit = needsAuth ? {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    } : {}

    const request = await fetch(url + path, {
        method: 'DELETE',
        headers: headersTemp,
    });

    const response = await request.json();

    return {
        data: response as R,
        errorMessage: undefined,
        responseCode: request.status
    };
}
