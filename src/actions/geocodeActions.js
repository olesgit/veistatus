import * as types from './ActionTypes';




export function loadGeoCodeSuccess(geocode) {
    return { type: types.LOAD_GEOCODE_SUCCESS, geocode };
}

export function loadGeoCodePromise(data) {
            console.log("yes");

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Object.assign([], data));
        }, 0);
    });
}


// export function loadGeoCode(place, status, data) {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//             var lat = place.geometry.location.lat();
//             var lng = place.geometry.location.lng();
//             // console.log(lat);
//             // console.log(lng);
//             data.lat = lat; data.lon = lng;

//             console.log(data);
//             return dispatch => {
//                 return loadGeoCodePromise(data).then(res => {
//                     dispatch(loadGeoCodeSuccess(res))
//                 }).catch(err => {
//                     console.log("loadGeoCode on places returns: ");
//                     console.log(status);

//                 })
//             }
//         }
//     }


// export function loadGeoCode( data) {
//     return dispatch => {
//         return loadGeoCodePromise(data).then(res => {
//             dispatch(loadGeoCodeSuccess(res))
//         }).catch(err => {
//             console.log("loadGeoCode on places returns: ");
//             console.log(status);
//         })
//     }
// }

const contracts = [
    {
        id: "1",
        Kontraktsnavn: "Kontrakt 1",
        Område: "Nord",
        Gyldighet: "01.10.2016 - 01.10.2020"
    },
    {
        id: "2",
        Kontraktsnavn: "Kontrakt 2",
        Område: "Sør",
        Gyldighet: "01.07.2015 - 01.07.2019"
    },
    {
        id: "3",
        Kontraktsnavn: "Kontrakt 3",
        Område: "Sør",
        Gyldighet: "01.10.2010 - 01.11.2015"
    }
];

export class ContractApi {
    static getAllContracts() {
            console.log("JE");

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], contracts));
            }, 10);
        });
    }
}

export function loadCompanySpecificContracts(id) {
    return function (dispatch) {
        ContractApi.getAllContracts()
            .then(contracts => {
                dispatch(loadGeoCodeSuccess(contracts));
            })
            .catch(error => {
                console.log("contracts ERROR");
                throw (error);
            });

    };
}
