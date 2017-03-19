import dateFormat from "dateformat"

export function successData(response)
{
    if (response.data)
    {
        let data = response.data;
        let status = response.status;
        if (status === 200)
        {
            return data.result;
        }
    }
    return response
}
export function formatDateByCommaSepratedDayMonthYear(dato)
{
    if (dato.length > 0)
    {
        return dateFormat(dato, "dd.mm.yyyy")
    }
    return ""
}
export function formatDateByCommaSepratedYearMonthDay(dato)
{
    if (dato.length > 0)
    {
        return dateFormat(dato, "yyyy.mm.dd")
    }
    return ""
}
export function formatDateByHyphenSepratedYearMonthDay(dato)
{
    if (dato.length > 0)
    {
        return dateFormat(dato, "yyyy-mm-dd")
    }
    return ""
}
export function formatDateBySlashSepratedDayMonthYear(dato)
{
    if (dato.length > 0)
    {
        return dateFormat(dato, "dd/mm/yyyy")
    }
    return ""
}

export function DateTimeNowFormated()
{
    return dateFormat(Date.now(), "yyyy-mm-dd_HH-MM-ss")
}

export function DateTimeIsAfter(date)
{
    let now = dateFormat(Date.now(), "dd.mm.yyyy")
    let parseDate = Date.parse(date)
    let parseNow = Date.parse(now)
    // console.log(parseDate)
    // console.log(parseNow)
    return parseDate > parseNow

}

export function formatDateCommaSepratedDayMonthYearAndFullTime(dato)
{
    if (dato.length > 0)
    {
        return dateFormat(dato, "dd.mm.yyyy  HH:MM:ss")
    }
    return ""
}

export function errorData(err)
{
    if (err.response)
    {
        if (err.response.status === 500)
        {
            return "Feil oppsto på server siden, vennligst kontak systemadministrator."
        }
        else
        {
            let res = err.response.data.errorMessage
            return res
        }
    }
    return err
}

export function dateIsAfter(str)
{
    let now = dateFormat(Date.now(), "dd.mm.yyyy")
    let sp1 = str.split(".")
    let sp2 = now.split(".")
    let t1 = new Date(sp1[2], sp1[1] - 1, sp1[0]);
    let t2 = new Date(sp2[2], sp2[1] - 1, sp2[0]);
    let compare = (t1 > t2)
    return compare
}

export function leftRightAngles(messag)
{
    let rightAngle = "»";
    let lefAngle = "«";
    let res = `${lefAngle + messag + rightAngle}`;
    return res;
}


