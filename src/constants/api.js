function RESOLVE_HOST() {
    if (process.env.REACT_APP_REACT_ENV === "production") {
        console.log("REACT_APP_REACT_ENV er definert som production, må utføres")
        return {
            veistatus_service_host: 'NA'
        };
    }

    else if (process.env.REACT_APP_REACT_ENV === "development") {
        return {
            veistatus_service_host: 'http://localhost:62222'
        };
    }
    else if (process.env.REACT_APP_REACT_ENV === "local") {
        return {
            veistatus_service_host: 'http://localhost:62222'
        };
    }

    throw new Error("No REACT_APP_REACT_ENV config found");
}

export const veistatusServiceBaseUrl = RESOLVE_HOST().veistatus_service_host;
//export const getStreets = veistatusServiceBaseUrl + "/api/Gater";   //&?rigin=*  to avoid the No 'Access-Control-Allow-Origin' header is present error message (not verififed. This need the server to Enabling Cross-Origin Requests)
export const getStreets = veistatusServiceBaseUrl + "/api/HISTORIKKs";   //&?rigin=*  to avoid the No 'Access-Control-Allow-Origin' header is present error message (not verififed. Must Enable EnableCors on controller class)
export const putStreet = veistatusServiceBaseUrl + "/api/HISTORIKKs";   //PutHISTORIKK/id
export const postStreet = veistatusServiceBaseUrl + "/api/HISTORIKKs";   //PostHISTORIKK
export const deleteStreet = veistatusServiceBaseUrl + "/api/HISTORIKKs";   //DeleteHISTORIKK/id
