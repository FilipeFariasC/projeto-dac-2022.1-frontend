import axios from "axios";
import {LoginService} from "./LoginService";

export default class ApiService {

    #httpCliente;

    constructor(endpoint) {
        this.endpoint = endpoint;
        this.loginService = new LoginService();
        this.httpClient = axios.create(
            {
                baseURL: 'http://localhost:8080/api/',
                headers: {
                    "Authorization": `Bearer ${this.loginService.getJwtToken()}`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Content-Type": "application/json",
                }
            }
        );
    }

    post(url, params) {
        url = this.builUrl(url);
        return this.httpClient.post(url, params);
    }

    put(url, params) {
        url = this.builUrl(url);
        return this.httpClient.put(url, params);
    }
    patch(url, params) {
        url = this.builUrl(url);
        return this.httpClient.patch(url, params);
    }

    delete(url) {
        url = this.builUrl(url);
        return this.httpClient.delete(url);
    }

    get(url, config) {
        url = this.builUrl(url);
        return this.httpClient.get(url, config);
    }

    builUrl(url) {
        return `${this.endpoint}${url}`;
    }

}
