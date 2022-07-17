import axios from 'axios';
import {Buffer} from 'buffer';
import {  showWarningMessage } from 'components/Toastr';

export class LoginService {
    #httpClient = axios.create({
        baseURL: "http://localhost:8080/api/",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Content-Type": "application/json",
        },
    });

    #token_key = "token";

    async login(userDetails) {
        return await this.#httpClient
            .post("/login", userDetails)
            .then((response) => {
                localStorage.setItem(this.#token_key, response.data.token);
            });
    }
    logout() {
        localStorage.removeItem(this.#token_key);
    }

    #parseJwt(token) {
        const base64Url = token.split(".")[1];

        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

        const jsonPayload = decodeURIComponent(
            Buffer.from(base64, "base64")
                .toString("binary")
                .split("")
                .map((c) => {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    }

    async isValidToken() {
        this.#httpClient.post("/isValidToken", 
            {
                token:localStorage.getItem(this.#token_key)
            }
        ).then(()=>{
            return true;
        }).catch(()=>{
            return false;
        })
    }

    getJwtToken() {
        const token = localStorage.getItem(this.#token_key);
        this.isValidToken();
        if (token) {

            if(this.isValidToken()){
                return token;
            }
            localStorage.removeItem(this.#token_key);
            showWarningMessage("Sua sessão expirou.", "Faça login novamente.", {
                timeOut: "15000",
            });
            return null;
        }
        return null;
    }

    isAuthenticated() {
        var token = this.getJwtToken();
        if (token) {
            return true;
        }
        return false;
    }

    getExpirationDate(jwtToken) {
        return new Date(jwtToken.exp * 1e3).toLocaleString("pt-BR", {
            timeZone: "America/Recife",
        });
    }
}

