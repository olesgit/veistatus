import validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data){
    let errors={};
    
    if(validator.isEmpty(data.applikasjonNavn)){
        errors.applikasjonNavn="Navn på service er påkrevd!";
    }
    if(validator.isEmpty(data.apiAdresse)){
        errors.apiAdresse="URL-addresse på service er påkrevd!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}