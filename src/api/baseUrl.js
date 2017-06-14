export default function getBaseUrl(){
 // const inDevelopment = window.location.hostname === "localhost";
 // return inDevelopment ? "http://localhost:5001/":"/";
 return getQueryStringParameterByName('useMockApi') ? "http://localhost:5001/":"https://dry-harbor-32373.herokuapp.com/";
}


function getQueryStringParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

