import axios from "axios";
import {LoginService, getJwtToken} from "./LoginService";

const httpClient = axios.create(
    {
        baseURL: 'http://localhost:8080/api/',
        headers: {
            "Authorization": `Bearer ${getJwtToken()}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Content-Type": "application/json",
        }
    }
);

export default class ApiService {

    constructor(endpoint) {
        this.endpoint = endpoint;
        this.loginService = new LoginService();
    }

    post(url, params) {
        url = this.builUrl(url);
        return httpClient.post(url, params);
    }

    put(url, params) {
        url = this.builUrl(url);
        return httpClient.put(url, params);
    }
    patch(url, params) {
        url = this.builUrl(url);
        return httpClient.patch(url, params);
    }

    delete(url) {
        url = this.builUrl(url);
        return httpClient.delete(url);
    }

    get(url, config) {
        url = this.builUrl(url);
        return httpClient.get(url, config);
    }

    builUrl(url) {
        return `${this.endpoint}${url}`;
    }

}
