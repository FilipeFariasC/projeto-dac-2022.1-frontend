function parseJwt (token) {
    console.log(token);
    // var base64Url = token.split('.')[1];
    var base64Url = token;
    console.log(base64Url);
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    console.log(base64);

    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    console.log(jsonPayload);

    return JSON.parse(jsonPayload);
};


// Language: javascript
// Path: parse-jwt.js
var parsed = parseJwt("eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE2NTU2NDg1MjgsImlhdCI6MTY1NTA0MzcyOH0");

console.log(parsed);

expirationTime = parsed.exp;

console.log(expirationTime);

console.log(new Date(expirationTime * 1e3).toLocaleString("pt-BR", {timeZone: "America/Recife"}));
