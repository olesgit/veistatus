import validator from "validator";
import isEmpty from "lodash/isEmpty";


export default function validateInput(data) {
	let errors = {};
	if (validator.isEmpty(data.epost)) {
		errors.epost = "E-post er påkrevd!";
	}
	else if (!validator.isEmail(data.epost)) {
		errors.epost = "E-post er ugyldig!";
	}
	if (validator.isEmpty(data.navn)) {
		errors.navn = "Navn er påkrevd!";
	}
	if (validator.isNumeric(data.selectedValue.toString())) {
		if (data.selectedValue < 1) {
			errors.selectedValue = "En rolle må velges!";
		}
	}
	return {
		errors,
		isValid: isEmpty(errors)
	}
}