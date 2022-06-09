import axios from "axios";

const httpClient = axios.create(
    {
        baseURL: 'http://localhost:8080/api/'
    }
);

export default class ApiService {

    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    post(url, params, config) {
        url = this.builUrl(url);
        return httpClient.post(url, params, config);
    }

    put(url, params, config) {
        url = this.builUrl(url);
        return httpClient.put(url, params, config);
    }

    delete(url, params, config) {
        url = this.builUrl(url);
        return httpClient.delete(url, params, config);
    }

    get(url, params, config) {
        url = this.builUrl(url);
        return httpClient.get(url, params, config);
    }

    builUrl(url) {
        return `${this.endpoint}${url}`;
    }

}