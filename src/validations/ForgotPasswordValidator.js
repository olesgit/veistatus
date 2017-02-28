import validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data){
    let errors={};    
    if (validator.isEmpty(data.epost)){
        errors.epost="E-post er påkrevd!";
    }
    else if(!validator.isEmail(data.epost)){
        errors.epost="E-post er ugyldig!";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }

}