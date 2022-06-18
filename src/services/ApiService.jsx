import axios from "axios";

const httpClient = axios.create(
    {
        baseURL: 'http://localhost:8080/api/'
    }
);

export default class ApiService {

    constructor(endpoint) {
        httpClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
        httpClient.defaults.headers.common['Content-Type'] = 'application/json';
        httpClient.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        httpClient.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';

        
        this.config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Content-Type": "application/json",
            }
        }

        this.endpoint = endpoint;
    }

    post(url, params) {
        url = this.builUrl(url);
        return httpClient.post(url, params, this.config);
    }

    put(url, params) {
        url = this.builUrl(url);
        return httpClient.put(url, params, this.config);
    }
    patch(url, params) {
        url = this.builUrl(url);
        return httpClient.patch(url, params, this.config);
    }

    delete(url) {
        url = this.builUrl(url);
        return httpClient.delete(url, this.config);
    }

    get(url, config) {
        url = this.builUrl(url);
        return httpClient.get(url, Object.assign(this.config, config));
    }

    builUrl(url) {
        return `${this.endpoint}${url}`;
    }

}
