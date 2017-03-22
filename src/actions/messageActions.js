export const MESSAGE_ADDRESS_SPECIFIED = 'MESSAGE_ADDRESS_SPECIFIED'
export const MESSAGE_CATEGORY_SPECIFIED = 'MESSAGE_CATEGORY_SPECIFIED'
export const MESSAGE_PICTURE_SPECIFIED = 'MESSAGE_PICTURE_SPECIFIED'
export const MESSAGE_DESCRIPTION_SPECIFIED = 'MESSAGE_DESCRIPTION_SPECIFIED'

export const MESSAGE_SUBMIT_REQUEST = 'MESSAGE_SUBMIT_REQUEST'
export const MESSAGE_SUBMIT_SUCCESS = 'MESSAGE_SUBMIT_SUCCESS'
export const MESSAGE_SUBMIT_FAILURE = 'MESSAGE_SUBMIT_FAILURE'

export function addressSpecified(address) {
    return {
        type: MESSAGE_ADDRESS_SPECIFIED,
        payload: address
    };
}

export function categorySpecified(category) {
    return {
        type: MESSAGE_CATEGORY_SPECIFIED,
        payload: category
    };
}

export function picturesSpecified(pictures) {
    return {
        type: MESSAGE_PICTURE_SPECIFIED,
        payload: pictures
    };
}

export function descriptionSpecified(description) {
    return {
        type: MESSAGE_CATEGORY_SPECIFIED,
        payload: description
    };
}

const submitMessageRequest = () => ({ type: MESSAGE_SUBMIT_REQUEST })
const submitMessageSuccess = () => ({ type: MESSAGE_SUBMIT_SUCCESS })
const submitMessageFailure = () => ({ type: MESSAGE_SUBMIT_FAILURE })

export function submitMessage() {
    return function (dispatch) {
        // dispatch(submitMessageRequest());
        // return messageApi.getAllMessages()
        //     .then(response => dispatch(submitMessageSuccess(response)))
        //     .catch(error => dispatch(submitMessageFailure(error)));
    };
}