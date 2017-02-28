import validator from "validator";
import _ from "lodash";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data)
{
    let errors = {};
    let access = data.brukerTilgang;
    console.log(access);
    let size = _.size(access);
    if (validator.isEmpty(data.epost))
    {
        errors.epost = "E-post er påkrevd!";
    }
    else if (!validator.isEmail(data.epost))
    {
        errors.epost = "E-post er ugyldig!";
    }
    if (validator.isEmpty(data.navn))
    {
        errors.navn = "Navn er påkrevd!";
    }
    if (validator.isNumeric(size.toString()) && size > 0)
    {
        let counter = 0;
        let selectApp = "";
        let selectRole = "";
        let arr = [];
        let appsDuplicates = [];
        _.map(access, (obj) =>
        {
            if (obj.applikasjonId < 1 && obj.rolleId < 1)
            {
                selectApp = "En service må velges!";
                selectRole = "En rolle må velges!";
                arr.push({ applikasjonId: selectApp, rolleId: selectRole });
            }
            else if (obj.applikasjonId < 1)
            {
                selectApp = "En service må velges!";
                arr.push({ applikasjonId: selectApp, rolleId: selectRole });
            }
            else if (obj.rolleId < 1)
            {
                selectRole = "En rolle må velges!";
                arr.push({ applikasjonId: selectApp, rolleId: selectRole });
            }

            if (_.includes(appsDuplicates, obj.applikasjonId))
            {
                selectApp = "Servicer må ikke være like!"
            }
            if (obj.applikasjonId > 0)
            {
                appsDuplicates.push(obj.applikasjonId);
            }
            counter++;
        })
        if (arr.length > 0)
        {
            errors.brukerTilgang = arr;
        }
        console.log(arr);
        console.log(errors);
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}