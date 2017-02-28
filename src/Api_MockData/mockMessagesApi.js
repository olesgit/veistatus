import delay from './delay';

//message type kan bla være: Brøyting, Hull i veien, Tagging, Søppel
//message adresse er en gateadresse, feks Maridalsveien 2
//message status kan være bla: Ubehandlet, Pågående, Ferdigstilt
export let messages = [{
    id: '3a473add-2e7a-4a6d-9ac8-ac3e6bb4d6b6',
    type: 'Brøyting',
    adresse: 'Maridalsveien 2',
    innmeldt: '01.01.2017',
    status: 'Pågående'
}, {
    id: '4cd15c9f-5e9d-4a59-a041-e8987f8d5345',
    type: 'Hull i veien',
    adresse: 'Markveien 4',
    innmeldt: '02.01.2017',
    status: 'Ubehandlet'
},{
    id: '3a473add-2e7a-4a6d-9ac8-ac3e6bb4d6b7',
    type: 'Tagging',
    adresse: 'Uelandsgate 6',
    innmeldt: '03.01.2017',
    status: 'Ubehandlet'
}, {
    id: '4cd15c9f-5e9d-4a59-a041-e8987f8d5348',
    type: 'Søppel',
    adresse: 'Maridalsveien 2',
    innmeldt: '01.01.2017',
    status: 'Ferdigstilt'
}];



class messageApi {
    static getAllMessages() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], messages));
            }, delay);
        });
    }
}

export default messageApi;
