function RESOLVE_HOST() {

    if (process.env.REACT_APP_REACT_ENV === "production") {
        return {
            bymelding_service_host: 'http://bymelding-service.bymoslo.no:80'
        };
    }

    else if (process.env.REACT_APP_REACT_ENV === "testing") {
        return {
            bymelding_service_host: 'http://bymelding-service-test.bymoslo.no:80'
        };
    }
    else if (process.env.REACT_APP_REACT_ENV === "staging") {
        return {
            bymelding_service_host: 'http://stage-bymelding-service.bym-stage-service.1b8f4e58.svc.dockerapp.io:5003'
        };
    }

    else if (process.env.REACT_APP_REACT_ENV === "development") {
        return {
            bymelding_service_host: 'http://dev-bymelding-service.bym-dev-bymelding.fb6e1c5c.svc.dockerapp.io:5003'
        };
    }
    else if (process.env.REACT_APP_REACT_ENV === "local") {
        return {
            bymelding_service_host: 'http://localhost:5003'
        };
    }
    else if (process.env.REACT_APP_REACT_ENV === "localdocker") {
        return {
            bymelding_service_host: 'http://localhost:5003'
        };
    }
    else if (process.env.REACT_APP_REACT_ENV === "mock") {
        return {
            bymelding_service_host: 'http://localhost:5003'
        };
    }
    throw new Error("No REACT_APP_REACT_ENV config found");
}

export const bymeldingServiceBaseUrl = RESOLVE_HOST().bymelding_service_host;

export const getMessageCategories = bymeldingServiceBaseUrl + "/api/meldingskategorigrupper";
export const postMessage = bymeldingServiceBaseUrl + "/api/meldinger";
