import axios from "axios";

const BASE_URL = '';

const client = axios.create({
    baseURL: BASE_URL,
    responseType: "json",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

export default client;