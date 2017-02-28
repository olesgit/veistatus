export const home="/"
export const login = "/login";
export const meldinger = "/meldinger";
export const selskaper = "/entrepreneurs";
export const kontrakter = "/contract";
export const brukere = "/user";
export const prosessKodeSkjema = "/processcodeschemes";
export const serviceAvdelingen = "/serviceavdelingen";

export function getDisplayName(path) {
    const pathMapping = {
        [meldinger]: "Meldinger",
        [selskaper]: "Entreprenører",
        [kontrakter]: "Kontrakter",
        [brukere]: "Bruker",
        [prosessKodeSkjema]: "Prosesskoder",
        [serviceAvdelingen]: "Serviceavdelingen"
    };

    const indexOfNextSlash = path.substring(1).indexOf('/');
    if (indexOfNextSlash > 0)
        path = path.substring(0, indexOfNextSlash+1);

    if (!(path in pathMapping))
        return "";
    return pathMapping[path];
};