export const home="/"
export const login = "/login";
export const meldinger = "/meldinger";


export function getDisplayName(path) {
    const pathMapping = {
        [meldinger]: "MeldingsListe"
    };

    const indexOfNextSlash = path.substring(1).indexOf('/');
    if (indexOfNextSlash > 0)
        path = path.substring(0, indexOfNextSlash+1);

    if (!(path in pathMapping))
        return "";
    return pathMapping[path];
}