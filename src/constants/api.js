function RESOLVE_HOST()
{

    if (process.env.REACT_APP_REACT_ENV === "production")
    {
        return {
            bymelding_service_host: 'http://bymelding-service.bymoslo.no:80',
            autentisering_service_host: 'http://autentisering-service.bymoslo.no:80',
        };
    }
    
    else if (process.env.REACT_APP_REACT_ENV === "testing")
    {
        return {
            bymelding_service_host: 'http://bymelding-service-test.bymoslo.no:80',
            autentisering_service_host: 'http://autentisering-service-test.bymoslo.no:80',
        };
    }

    else if (process.env.REACT_APP_REACT_ENV === "development")
    {
        return {
            bymelding_service_host: 'http://dev-bymelding-service.bym-dev-bymelding.fb6e1c5c.svc.dockerapp.io:5003',
            autentisering_service_host: 'http://dev-autentisering-service.bym-dev-autentisering.ef5138b2.svc.dockerapp.io:5015',
        };
    }
    else if (process.env.REACT_APP_REACT_ENV === "local")
    {
        return {
            bymelding_service_host: 'http://localhost:5003',
            autentisering_service_host: 'http://localhost:5015',
        };
    }
    else if (process.env.REACT_APP_REACT_ENV === "localdocker")
    {
        return {
            bymelding_service_host: 'http://localhost:5003',
            autentisering_service_host: 'http://localhost:5015',
        };
    }
    else if (process.env.REACT_APP_REACT_ENV === "mock") {
        return {
            bymelding_service_host: 'http://localhost:5003',
            autentisering_service_host: 'http://localhost:5015',
        };
    }
    throw new Error("No REACT_APP_REACT_ENV config found");
}

export const autentiseringServiceBaseUrl = RESOLVE_HOST().autentisering_service_host;
export const bymeldingServiceBaseUrl = RESOLVE_HOST().bymelding_service_host;

/************************************ Authentication ********************************** */
export const loginApi= function()
{
        let uri ="/api/token";    
        return  autentiseringServiceBaseUrl + uri;
};
export const AuthenticationServiceInfo = bymeldingServiceBaseUrl+"/api/serviceinfo";

/************************************ bymelding ********************************** */
export const selskaperUrl = bymeldingServiceBaseUrl + "/api/selskaper";
export const selskapsTyperUrl = bymeldingServiceBaseUrl + "/api/selskapstyper";
export const kontrakterUrl = bymeldingServiceBaseUrl + "/api/kontrakter";
export const kontraktSonerUrl = bymeldingServiceBaseUrl + "/api/kontraktsoner";
export const bulkoppdateringerUrl = bymeldingServiceBaseUrl + "/api/bulkoppdateringer";
export const prosessKodeSkjemaerUrl = bymeldingServiceBaseUrl + "/api/prosesskodeskjemaer";
export const prosesskoderUrl = bymeldingServiceBaseUrl + "/api/prosesskoder";
export const prisendringerUrl = bymeldingServiceBaseUrl + "/api/prisendringer";

export const selskapsBrukere = function (selskapsId) {
    let uri = "/api/selskaper/" + selskapsId + "/brukere";
    return bymeldingServiceBaseUrl + uri;
};

export const selskaperByType = function (selskapsType) {
    return selskapsTyperUrl + '/' + selskapsType + '/selskaper';
};

/************************************ WORM meldinger ********************************** */
export const getWormMeldingByMeldingId=function(meldingId){
    let uri="/api/wormmeldingermedkart/"+meldingId;
    return bymeldingServiceBaseUrl+uri;
};
export const getWormMeldingByBrukerId=function(brukerId,sortBy,filterByFromDate){
    let uri="/api/wormbrukere/"+brukerId+"/wormmeldingermedkart?SortBy="+sortBy+"&FilterByFromDate="+filterByFromDate;
    return bymeldingServiceBaseUrl+uri;
};
export const getWormMeddingKartByMeldingId= function(meldingId){
    let uri="/api/wormmeldingermedkart/"+meldingId;
    return bymeldingServiceBaseUrl+ uri;
};

export const getWormMeldingBilde=function(ostUtm32,nordUtm32){
    //let uri="/api/wormmeldinger/base64kartutm32/"+ostUtm32+"/"+nordUtm32
    let uri="/api/wormmeldinger/base64kartutm32/"+ostUtm32+"/"+nordUtm32;
    
    return bymeldingServiceBaseUrl+ uri
};

