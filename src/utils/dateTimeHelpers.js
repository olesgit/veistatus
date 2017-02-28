// 15. november 2016
export function toDateString(value) {
    if (value) {
        const  optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(value);
        return date.toLocaleString("nb-NO", optionsDate);
    }
}

// 15. november 2016 kl. 14:24
export function toDateTimeString(value) {
    if (value) {
        const  optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
        const  optionsTime = { hour: '2-digit', minute: '2-digit' };
        const date = new Date(value);
        return date.toLocaleString("nb-NO", optionsDate)
            + " kl. "
            + date.toLocaleString("nb-NO", optionsTime);
    }
}

// 18.09.2016 kl. 14.01
export function toDateTimeNumericString(value) {
    if (value) {
        const  optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const  optionsTime = { hour: '2-digit', minute: '2-digit' };
        const date = new Date(value);
        return date.toLocaleString("nb-NO", optionsDate)
            + " kl. "
            + date.toLocaleString("nb-NO", optionsTime);
    }
}


// 18.09.2016
export function toDateNumericString(value) {
    if (value) {
        const  optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(value);
        return date.toLocaleString("nb-NO", optionsDate);
    }
}

// november 2016
export function toMonthYearString(value) {
    if (value) {
        const  optionsDate = { year: 'numeric', month: 'long' };
        const date = new Date(value);
        var d = date.toLocaleString("nb-NO", optionsDate);
        return d.substr(0,1).toString().toUpperCase() + d.substring(1);
    }
}
