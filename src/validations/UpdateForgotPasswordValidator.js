import validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data){
    const errors = {};
    if(validator.isEmpty(data.nyttpassord)){
        errors.nyttpassord="Nytt passord er påkrevd";
    }
    if(validator.isEmpty(data.gjentanyttpassord)){
        errors.gjentanyttpassord="Gjenta nytt passord er påkrevd!";
    }
    else if(!validator.equals(data.nyttpassord, data.gjentanyttpassord)){
        errors.gjentanyttpassord="Begge passord må være like!";
    }
    else if(!validator.isLength(data.nyttpassord,6))
    {
        errors.nyttpassord="Nytt passord må være minst 6 karakterer!";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
} 