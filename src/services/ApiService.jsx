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

    delete(url, config) {
        url = this.builUrl(url);
        return httpClient.delete(url, config);
    }

    get(url, config) {
        url = this.builUrl(url);
        return httpClient.get(url, config);
    }

    builUrl(url) {
        return `${this.endpoint}${url}`;
    }

}
