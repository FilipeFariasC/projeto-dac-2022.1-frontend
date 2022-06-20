
function parseJwt (token) {
    var base64Url = token.split(".")[1];

    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
};

export function getJwtToken(){
    var token = localStorage.getItem("jwt_token");
    if(token){
        var loginInfo = parseJwt(token);
        var expirationTime = getExpirationDate(loginInfo);

        if (loginInfo.exp * 1e3 > new Date().getTime()) {
          return token;
        }
        localStorage.removeItem("jwt_token");
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
