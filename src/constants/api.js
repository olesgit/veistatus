function RESOLVE_HOST() {

    if (process.env.REACT_APP_REACT_ENV === "production") {
        return {
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
        };
    }

    else if (process.env.REACT_APP_REACT_ENV === "development") {
        return {
            bymelding_service_host: 'http://bymelding-service-dev.bymoslo.no:80',
            autentisering_service_host: 'http://autentisering-service-dev.bymoslo.no:80'
        };
    }
    else if (process.env.REACT_APP_REACT_ENV === "local") {
        return {
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
        };
    }
    throw new Error("No REACT_APP_REACT_ENV config found");
}

// Service Base URLs
export const bymeldingServiceBaseUrl = RESOLVE_HOST().bymelding_service_host;
export const autentiseringServiceBaseUrl = RESOLVE_HOST().autentisering_service_host;

// Bymelding
export const getMessageCategories = bymeldingServiceBaseUrl + "/api/meldingskategorigrupper"
export const postMessage = bymeldingServiceBaseUrl + "/api/meldinger"

// Autentisering
export const login = autentiseringServiceBaseUrl + '/api/token'
export const resetPassword = autentiseringServiceBaseUrl + '/api/glemtpassord'





export const registerUser = "";