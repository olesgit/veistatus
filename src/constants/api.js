function RESOLVE_HOST() {
    if (process.env.REACT_APP_REACT_ENV === "production") {
        console.log("REACT_APP_REACT_ENV er definert som production, må utføres")
        return {
<<<<<<< HEAD
            veistatus_service_host: 'NA'
=======
            bymelding_service_host: 'http://bymelding-service.bymoslo.no:80',
            autentisering_service_host: 'http://autentisering-service-prod.bymoslo.no:80'
        };
    }

    else if (process.env.REACT_APP_REACT_ENV === "testing") {
        return {
            bymelding_service_host: 'http://bymelding-service-test.bymoslo.no:80',
            autentisering_service_host: 'http://autentisering-service-test.bymoslo.no:80'
        };
    }
    else if (process.env.REACT_APP_REACT_ENV === "staging") {
        return {
            bymelding_service_host: 'http://bymelding-service-stage.bymoslo.no:80',
            autentisering_service_host: 'http://autentisering-service-stage.bymoslo.no:80'
>>>>>>> 189fa3b46733ccc3bf9fe3b4318f0a45f9f55328
        };
    }

    else if (process.env.REACT_APP_REACT_ENV === "development") {
        return {
<<<<<<< HEAD
            veistatus_service_host: 'http://localhost:62222'
=======
            bymelding_service_host: 'http://bymelding-service-dev.bymoslo.no:80',
            autentisering_service_host: 'http://autentisering-service-dev.bymoslo.no:80'
>>>>>>> 189fa3b46733ccc3bf9fe3b4318f0a45f9f55328
        };
    }
    else if (process.env.REACT_APP_REACT_ENV === "local") {
        return {
<<<<<<< HEAD
            veistatus_service_host: 'http://localhost:62222'
=======
            bymelding_service_host: 'http://localhost:5003',
            autentisering_service_host: 'http://localhost:5015'
        };
    }
    else if (process.env.REACT_APP_REACT_ENV === "localdocker") {
        return {
            bymelding_service_host: 'http://localhost:5003',
            autentisering_service_host: 'http://localhost:5015'
        };
    }
    else if (process.env.REACT_APP_REACT_ENV === "mock") {
        return {
            bymelding_service_host: 'http://localhost:5003',
            autentisering_service_host: 'http://localhost:5015'
>>>>>>> 189fa3b46733ccc3bf9fe3b4318f0a45f9f55328
        };
    }

    throw new Error("No REACT_APP_REACT_ENV config found");
}

<<<<<<< HEAD
export const veistatusServiceBaseUrl = RESOLVE_HOST().veistatus_service_host;
//export const getStreets = veistatusServiceBaseUrl + "/api/Gater";   //&?rigin=*  to avoid the No 'Access-Control-Allow-Origin' header is present error message (not verififed. This need the server to Enabling Cross-Origin Requests)
export const getStreets = veistatusServiceBaseUrl + "/api/HISTORIKKs";   //&?rigin=*  to avoid the No 'Access-Control-Allow-Origin' header is present error message (not verififed. Must Enable EnableCors on controller class)
export const putStreet = veistatusServiceBaseUrl + "/api/HISTORIKKs";   //PutHISTORIKK/id
export const postStreet = veistatusServiceBaseUrl + "/api/HISTORIKKs";   //PostHISTORIKK
export const deleteStreet = veistatusServiceBaseUrl + "/api/HISTORIKKs";   //DeleteHISTORIKK/id
=======
// Service Base URLs
export const bymeldingServiceBaseUrl = RESOLVE_HOST().bymelding_service_host;
export const autentiseringServiceBaseUrl = RESOLVE_HOST().autentisering_service_host;

// Bymelding
export const getMessageCategories = bymeldingServiceBaseUrl + "/api/meldingskategorigrupper"
export const postMessage = bymeldingServiceBaseUrl + "/api/meldinger"
export const registerUser = bymeldingServiceBaseUrl + "/api/publikum/brukere"

// Autentisering
export const login = autentiseringServiceBaseUrl + '/api/token'
export const resetPassword = autentiseringServiceBaseUrl + '/api/glemtpassord'
export const changePassword = brukerId => autentiseringServiceBaseUrl + `/api/brukere/${brukerId}/passord`
>>>>>>> 189fa3b46733ccc3bf9fe3b4318f0a45f9f55328
