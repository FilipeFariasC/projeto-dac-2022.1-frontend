import axios from "axios";
import {LoginService} from "./LoginService";

export default class ApiService {

    #httpCliente;

    constructor(endpoint) {
        this.endpoint = endpoint;
        this.loginService = new LoginService();
        const token = this.loginService.getJwtToken();

        this.httpClient = axios.create(
            {
                baseURL: `http://${process.env.REACT_APP_BACKEND_URL}:8080/api/`,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Content-Type": "application/json",
                }
            }
        );
    }

    post(url, body, config) {
        url = this.builUrl(url);
        return this.httpClient.post(url, body, config);
    }

    put(url, body, config) {
        url = this.builUrl(url);
        return this.httpClient.put(url, body, config);
    }
    patch(url, body, config) {
        url = this.builUrl(url);
        return this.httpClient.patch(url, body, config);
    }

    delete(url, config) {
        url = this.builUrl(url);
        return this.httpClient.delete(url, config);
    }

    get(url, body, config) {
        url = this.builUrl(url);
        return this.httpClient.get(url, body, config);
    }

    builUrl(url) {
        return `${this.endpoint}${url}`;
    }

}
