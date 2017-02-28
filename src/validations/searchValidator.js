import validator from "validator"
import isEmpty from "lodash/isEmpty";
import {dateIsAfter} from "../utils/utils"

export function validateBrukerIdInput(data)
{
    let errors = {}
    if (validator.isEmpty(data.brukerId))
    {
        errors.brukerId = "Brukerid er påkrevd"
    }
    if (data.selectedDate)
    {
        if(dateIsAfter(data.selectedDate))
        {
            errors.selectedDate = "Fradato må ikke være større enn idag"
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateMeldingIdInput(data)
{
    let errors = {}
    if (validator.isEmpty(data.meldingId))
    {
        errors.meldingId = "Meldingsid er påkrevd"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}



// if (validator.isNumeric(data.zoneSelectedValue.toString()))
//     {
//         if (parseInt(data.zoneSelectedValue) < 1)
//         {            
//             errors.zoneSelectedValue = "En sone må velges!";
//         }
//     }