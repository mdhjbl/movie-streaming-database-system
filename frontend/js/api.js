const BASE_URL = "http://localhost:3000/api";

async function api(endpoint, method = "GET", body = null) {

    const options = {

        method,

        headers: {
            "Content-Type": "application/json"
        }

    };

    const token = Storage.getToken();

    if (token) {

        options.headers.Authorization = `Bearer ${token}`;

    }

    if (body) {

        options.body = JSON.stringify(body);

    }

    const response = await fetch(BASE_URL + endpoint, options);

    return await response.json();

}