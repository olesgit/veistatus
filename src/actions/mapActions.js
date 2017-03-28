export const LOCATION_SELECTED = 'LOCATION_SELECTED'

export function locationSelected(geodata) {
    return {
        type: LOCATION_SELECTED,
        payload: geodata
    }
}