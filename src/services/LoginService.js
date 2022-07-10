import axios from 'axios';
import {Buffer} from 'buffer';
import {  showWarningMessage } from 'components/Toastr';

export class LoginService {

    #httpClient = axios.create({
        baseURL: "http://localhost:8080/api/",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Content-Type": "application/json",
        },
    });

    login(userDetails) {
      return this.#httpClient
          .post("/login", userDetails)
          .then((response) => {
              localStorage.setItem("jwt_token", response.data.response);
          });
    }
    logout(){
      localStorage.removeItem("jwt_token");
    }

    #parseJwt(token) {
        var base64Url = token.split(".")[1];

        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

        var jsonPayload = decodeURIComponent(
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

    getJwtToken() {
        var token = localStorage.getItem("jwt_token");
        if (token) {
            var loginInfo = this.#parseJwt(token);

            if (loginInfo.exp * 1e3 > new Date().getTime()) {
                return token;
            }
            localStorage.removeItem("jwt_token");
            showWarningMessage("Sua sessão expirou.", "Faça login novamente.", {
                timeOut: "15000",
            });
            return null;
        }
        return null;
    }

    isAuthenticated(){
        var token = this.getJwtToken();
        if(token){
            return true;
        }
        return false;
    }

    getExpirationDate(jwtToken){
        return new Date(jwtToken.exp * 1e3).toLocaleString("pt-BR", {timeZone: "America/Recife"})
    }
}

/*
function parseJwt (token) {
    var base64Url = token.split(".")[1];

    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    var jsonPayload = decodeURIComponent(
        Buffer.from(base64,'base64')
        .toString("binary")
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join("")
    );

    return JSON.parse(jsonPayload);
};

export function getJwtToken(){
    var token = localStorage.getItem("jwt_token");
    if(token){
        var loginInfo = parseJwt(token);
        
        if (loginInfo.exp * 1e3 > new Date().getTime()) {
          return token;
        }
        localStorage.removeItem("jwt_token");
        showWarningMessage("Sua sessão expirou.", "Faça login novamente.", {
          timeOut: "15000",
        });
        return null;
    }
    return null;
}

export function isAuthenticated(){
    var token = getJwtToken();
    if(token){
        return true;
    }
    return false;
}



function getExpirationDate(jwtToken){
    return new Date(jwtToken.exp * 1e3).toLocaleString("pt-BR", {timeZone: "America/Recife"})
}
*/
