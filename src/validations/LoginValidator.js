import validator from "validator";

import isEmpty from "lodash/isEmpty";

export default function validateInput(data){
	let errors = {};
	if(validator.isEmpty(data.epost)){
		errors.epost="E-post er påkrevd!";
	}
	else if(!validator.isEmail(data.epost))
	{
		errors.epost="E-post er ugyldig!";
	}	
	if(validator.isEmpty(data.passord)){
		errors.passord="Passord er påkrevd!";
	}
	return{
		errors,
		isValid: isEmpty(errors)
	}
}