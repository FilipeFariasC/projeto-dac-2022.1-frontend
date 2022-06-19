
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


// Language: javascript
// Path: parse-jwt.js
var parsed = parseJwt(
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmaWxpcGUuZmFyaWFzLmNoYWdhc0BwbS5tZSIsImV4cCI6MTY1NjE5NTkzNiwiaWF0IjoxNjU1NTkxMTM2fQ.oHmdxZhFVBN-tcopf0heM12binuvA6o7DRE5kP0AcOA"
);

console.log(parsed);

var expirationTime = parsed.exp;

console.log(expirationTime);

console.log(new Date(expirationTime * 1e3).toLocaleString("pt-BR", {timeZone: "America/Recife"}));
