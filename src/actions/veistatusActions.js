import axios from 'axios'
import * as api from '../constants/api'

export const GET_STREETS_REQUEST = 'GET_STREETS_REQUEST'
export const GET_STREETS_SUCCESS = 'GET_STREETS_SUCCESS'
export const GET_STREETS_FAILURE = 'GET_STREETS_FAILURE'

const getStreetsRequest = () => ({ type: GET_STREETS_REQUEST })
const getStreetsSuccess = (data) => ({ type: GET_STREETS_SUCCESS, payload: data })
const getStreetsFailure = () => ({ type: GET_STREETS_FAILURE })

export const PUT_STREET_SUCCESS = 'PUT_STREET_SUCCESS'
const putStreetSuccess = (data) => ({ type: PUT_STREET_SUCCESS, street: data })

export const POST_STREET_SUCCESS = 'POST_STREET_SUCCESS'
const postStreetSuccess = (data) => ({ type: POST_STREET_SUCCESS, street: data })

export const DELETE_STREET_SUCCESS = 'DELETE_STREET_SUCCESS'
const deleteStreetSuccess = (data) => ({ type: DELETE_STREET_SUCCESS, street: data })

export function getStreets() {   
    return function (dispatch) {
        dispatch(getStreetsRequest());
        return axios.get(api.getStreets)  
            .then(response => {
                dispatch(getStreetsSuccess(response.data))
            })
            .catch(error => dispatch(getStreetsFailure(error)));
    };
}

export function putStreet(street) {   
  return function (dispatch) {
    return axios.put(api.putStreet + "/" + street.ID, street)
      .then(function (response) {
        dispatch(putStreetSuccess(street));
      })
      .catch(function (error) {
        console.log(error);
        throw (error);
      });
  };
}

export function postStreet(street) {   
  return function (dispatch) {
    return axios.post(api.postStreet, street)
      .then(function (response) {
        // console.log('testing response: ');
        // console.log(response.data);
        var res = response.data;
        street.ID = res.ID;
        dispatch(postStreetSuccess(street));
      })
      .catch(function (error) {
        console.log(error);
        throw (error);
      });
  };
}

export function deleteStreet(street) {   
  return function (dispatch) {
    return axios.delete(api.deleteStreet + "/" + street.ID, street)
      .then(function (response) {
        dispatch(deleteStreetSuccess(street));
      })
      .catch(function (error) {
        console.log(error);
        throw (error);
      });
  };
}

