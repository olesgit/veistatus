import filterCategorties, { isMatch, isPartialMatch, isMatchingNames, isPartialMatchingNames, searchWords, appendTo, namesOf, cleanupResult } from './categoryHelper'

describe('categoryHelper', () => {

    describe('isMatch', () => {
        it('should return true when name is equal to text', () => {
            expect(isMatch("test", "test")).toBeTruthy();
        })
        it('should return false when name is not equal to text', () => {
            expect(isMatch("test", "other")).toBeFalsy();
        })
        /** Special case, handle verbose text **/
        it('should return true when text starts with name', () => {
            expect(isMatch("vei", "veien")).toBeTruthy();
        })
    });

    describe('isMatchingNames', () => {
        it('should return true when at least one name matches', () => {
            expect(isMatchingNames(["park", "vei", "skinner"], "park")).toBeTruthy();
        })
        it('should return false when no matching names', () => {
            expect(isMatchingNames(["park", "vei", "skinner"], "par")).toBeFalsy();
        })
    })

    describe('isPartialMatch', () => {
        it('should return true when text can be found in name', () => {
            expect(isPartialMatch("test", "tes")).toBeTruthy();
        })
        it('should return false when text can not be found in name', () => {
            expect(isPartialMatch("test", "ert")).toBeFalsy();
        })
    })

    describe('isPartialMatchingNames', () => {
        it('should return true when at least one name partially matches', () => {
            expect(isPartialMatchingNames(["park", "vei", "skinner"], "par")).toBeTruthy();
        })
        it('should return false when no partial matching names', () => {
            expect(isPartialMatchingNames(["park", "vei", "skinner"], "gate")).toBeFalsy();
        })
    })

    describe('searchWords', () => {
        it('should return number of matching and partial matching words', () => {
            expect(searchWords([], ["test"])).toEqual({ match: 0, partial: 0 })
            expect(searchWords(["one", "two"], ["test"])).toEqual({ match: 0, partial: 0 })
            expect(searchWords(["park", "gate", "vei"], ["hull", "vei"])).toEqual({ match: 1, partial: 0 })
            expect(searchWords(["park", "gate", "vei"], ["par", "vei"])).toEqual({ match: 1, partial: 1 })
        })
    })

    describe('filterCategorties', () => {
        it('should work', () => {
            // var res = filterCategorties(categories, "hull i veien");
            // for (var i = 0; i < res.length; i++) {
            //     console.log(res[i].meldingstype.beskrivelse);
            // }
            expect(filterCategorties(categories, "hull i veien")).toEqual([categories[21], categories[38], categories[85], categories[13], categories[39], categories[71], categories[75]]);
        })
        /*TODO Write more tests*/
    })

    describe('appendTo', () => {
        it("should append property to object with key 'category'", () => {
            expect(appendTo({}, "test")).toEqual({ category: "test" })
        })
    })

    describe('namesOf', () => {
        it('should return all category names', () => {
            expect(namesOf({ meldingskategorier: [{ navn: "en" }, { navn: "to" }] })).toEqual(["en", "to"]);
        })
    })

    describe('cleanupResult', () => {
        it('faf', () => {
            const obj1 = { id: 1 };
            expect(cleanupResult([{ match: 1, category: obj1 }])).toEqual([obj1])
        })
        /*TODO Write more tests*/
    })
});

const categories = [
    {
        "meldingstype": {
            "meldingstypeId": "45cadea9-4dcc-42a5-82c0-f97c9060572a",
            "navn": "Holdeplass",
            "beskrivelse": "Bymøbel - Holdeplass",
            "kartlagKobling": "VeierRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "f22e60f1-60cf-833b-6486-e9c36be49e55",
                "navn": "Bymøbel"
            },
            {
                "meldingskategoriId": "a96672b8-91b8-841c-2209-58091e056e9c",
                "navn": "Holdeplass"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "4f1e96b3-3b7a-418e-b233-9acdd7912ad0",
            "navn": "Fremmed art - parkslirekne",
            "beskrivelse": "Biologisk mangfold - Fremmed art - parkslirekne",
            "kartlagKobling": "Mangfold"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "50689dfc-5d37-2f57-42c6-4c26386626a9",
                "navn": "Biologisk mangfold"
            },
            {
                "meldingskategoriId": "4b46d199-300f-2042-63a7-85e1652b66a2",
                "navn": "Fremmed art - parkslirekne"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "e605ca34-e9ee-4273-8f30-8104ad7523b6",
            "navn": "Overhengende/lave greiner/busker",
            "beskrivelse": "Beskjæring/trimming av trær/busker - Overhengende/lave greiner/busker",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "19893b59-2930-25e3-8a4e-0ebb665d23fc",
                "navn": "Overhengende/lave greiner/busker"
            },
            {
                "meldingskategoriId": "fd0d61c8-7b50-0b3e-7d01-159a14c87318",
                "navn": "Beskjæring, trimming av trær/busker"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "94b02d7a-b262-4dce-833a-d5a945c71a77",
            "navn": "Feil/mangler",
            "beskrivelse": "Bymøbel - Feil/mangler",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "f22e60f1-60cf-833b-6486-e9c36be49e55",
                "navn": "Bymøbel"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "f9b1c275-6f20-4da4-a0c4-a344c83f4320",
            "navn": "Strandrenhold",
            "beskrivelse": "Badeplass - Strandrenhold",
            "kartlagKobling": "ParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "6c5da501-66cd-a3fd-42ff-cdf433337907",
                "navn": "Strandrenhold"
            },
            {
                "meldingskategoriId": "08660077-92ce-0670-3f92-232117d2101d",
                "navn": "Badeplass"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "d6a54d0a-0e34-41b8-9d5d-09a347b6bf08",
            "navn": "Park/friområde",
            "beskrivelse": "Renhold - Park/friområde",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "f5c73e5a-189c-052a-7524-5cfc9d3482a4",
                "navn": "Park/friområde"
            },
            {
                "meldingskategoriId": "b7abf69e-4ae7-851c-8efe-4277a79a8feb",
                "navn": "Renhold"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "d6cf4beb-3181-4025-8310-21d1361b189c",
            "navn": "P-plass",
            "beskrivelse": "Brøyting/strøing - P-plass",
            "kartlagKobling": "VeierRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "dff56306-7923-99f2-62bb-5f4dddea8818",
                "navn": "P-plass"
            },
            {
                "meldingskategoriId": "e4e1f3e4-3dc0-1bc5-77af-facf460a5c89",
                "navn": "Brøyting/strøing"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "8d5b4098-4b2e-4f8a-b776-438be4f1a8ce",
            "navn": "Plen/grøntområder",
            "beskrivelse": "Gressklipping - Plen/grøntområder",
            "kartlagKobling": "Gressklipping"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "c56b4e55-1583-62ca-1b71-7c160c142d5d",
                "navn": "Gressklipping"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "2ea2c994-a635-40cc-a666-5ac4a5323976",
            "navn": "Feil/skade på søppelkasse",
            "beskrivelse": "Søppel - Feil/skade på søppelkasse",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "24de366d-8493-1cc9-1d8e-2669705c0a3e",
                "navn": "Søppel"
            },
            {
                "meldingskategoriId": "09b9ee5d-9f42-935c-668d-fd07ac2a33a1",
                "navn": "Skader/mangler"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "e414f798-454f-495c-ba61-ccbdd5a89296",
            "navn": "Annen forsøpling",
            "beskrivelse": "Søppel - Annen forsøpling",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "24de366d-8493-1cc9-1d8e-2669705c0a3e",
                "navn": "Søppel"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "70cf5652-5d77-4eae-9bc4-c2bacce32000",
            "navn": "Påkjørt/skadet skilt",
            "beskrivelse": "Skilt - Påkjørt/skadet skilt",
            "kartlagKobling": "SkiltVeier"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "fe59516d-9ccd-3775-9ed0-bf394b992cb8",
                "navn": "Skilt"
            },
            {
                "meldingskategoriId": "86b3a2ef-1343-1aca-7499-fd6a864201da",
                "navn": "Påkjørt/skadet trafikkskilt"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "af3ad505-7805-473e-968f-6efd3d6387ef",
            "navn": "Fortau",
            "beskrivelse": "Brøyting/strøing - Fortau",
            "kartlagKobling": "Broyting"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "e4e1f3e4-3dc0-1bc5-77af-facf460a5c89",
                "navn": "Brøyting/strøing"
            },
            {
                "meldingskategoriId": "a8c1fa9b-2ad6-8d4f-5e56-b32f0013228a",
                "navn": "Fortau"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "bc785dac-7322-432e-a69f-825b9073acaa",
            "navn": "Risiko",
            "beskrivelse": "Trær - Risiko",
            "kartlagKobling": "Tredata"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "ebd5c5bc-6143-3200-51de-a566df2f27b2",
                "navn": "Risiko"
            },
            {
                "meldingskategoriId": "6af7971b-7d29-0bf2-011e-89610c8f0bf9",
                "navn": "Trær"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "e30fd475-af97-4d52-83a7-a65fcdb2b7ff",
            "navn": "Dårlig standard etter gravearbeid",
            "beskrivelse": "Hull i veien - Dårlig standard etter gravearbeid",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "7c1107c0-4921-555e-1fd3-4c96400c18d8",
                "navn": "Hull"
            },
            {
                "meldingskategoriId": "89504bf4-710a-2de5-77cf-72fe82b55863",
                "navn": "Dårlig standard etter gravearbeid"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "a9ae66b9-d219-4de7-b4e4-6fe970c9a791",
            "navn": "Registrering villfylling/hageavfall",
            "beskrivelse": "Renhold - Registrering villfylling/hageavfall",
            "kartlagKobling": "Villfylling"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "b7abf69e-4ae7-851c-8efe-4277a79a8feb",
                "navn": "Renhold"
            },
            {
                "meldingskategoriId": "1c12f394-9c7b-0140-6941-55f62af55c60",
                "navn": "Registrering villfylling/hageavfall"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "8c91f015-9d9f-4fd8-a9e4-863308b49114",
            "navn": "Manglende brøyting",
            "beskrivelse": "Skøytebane - Manglende brøyting",
            "kartlagKobling": "Kunstisbaner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "e4e1f3e4-3dc0-1bc5-77af-facf460a5c89",
                "navn": "Brøyting/strøing"
            },
            {
                "meldingskategoriId": "0626fc05-124c-9c79-7f04-d9849b663c5c",
                "navn": "Skøytebane"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "643829f2-b4fb-460d-82e5-b79ffe90a27e",
            "navn": "Greiner skygger for belysning",
            "beskrivelse": "Trær - Greiner skygger for belysning",
            "kartlagKobling": "Tredata"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "6af7971b-7d29-0bf2-011e-89610c8f0bf9",
                "navn": "Trær"
            },
            {
                "meldingskategoriId": "79d9c61d-6d20-796e-3bb8-c458372179d9",
                "navn": "Greiner skygger for belysning"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "640db098-34c7-4f1a-9b65-58b6df1bfbe0",
            "navn": "Runde lokk som slår",
            "beskrivelse": "Sluk, kummer og lokk - Runde lokk som slår",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "2f5117af-8aa9-1471-2cf2-c2cf8f6c35c3",
                "navn": "Sluk, kummer og lokk"
            },
            {
                "meldingskategoriId": "89b9b7aa-338c-07c0-7992-9f8bc0119c5e",
                "navn": "Runde lokk som slår"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "b9bbb1ca-0914-4f4c-ae8b-b62ae2529a08",
            "navn": "Fortau",
            "beskrivelse": "Renhold - Fortau",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "b7abf69e-4ae7-851c-8efe-4277a79a8feb",
                "navn": "Renhold"
            },
            {
                "meldingskategoriId": "a8c1fa9b-2ad6-8d4f-5e56-b32f0013228a",
                "navn": "Fortau"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "aa852bba-c61e-4208-83c0-d7be4575a93f",
            "navn": "Blender",
            "beskrivelse": "Gatelys - Blender",
            "kartlagKobling": "Armatur"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "c332f8d9-8ba8-75d7-6847-67a36f3a63e3",
                "navn": "Gatelys"
            },
            {
                "meldingskategoriId": "54c303e2-a441-459c-68c2-feae3d306368",
                "navn": "Blender"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "8b744e31-7ec1-4430-a8df-10805061e6f7",
            "navn": "Fremmed art - canadagulris",
            "beskrivelse": "Biologisk mangfold - Fremmed art - canadagulris",
            "kartlagKobling": "Mangfold"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "4802334a-1e75-0f25-9e0f-ac5913b53094",
                "navn": "Fremmed art - canadagulris"
            },
            {
                "meldingskategoriId": "50689dfc-5d37-2f57-42c6-4c26386626a9",
                "navn": "Biologisk mangfold"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "d39c1c20-0fbf-446e-8b65-dedd3e0106d0",
            "navn": "Sykkelfelt",
            "beskrivelse": "Hull i veien - Sykkelfelt",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "7c1107c0-4921-555e-1fd3-4c96400c18d8",
                "navn": "Hull"
            },
            {
                "meldingskategoriId": "18df8597-117f-9da4-6e4a-6a1db42b267a",
                "navn": "Sykkelfelt"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "536c10c1-e47f-48ad-8eaf-51e5d1f29030",
            "navn": "Greiner skygger for belysning",
            "beskrivelse": "Beskjæring/trimming av trær/busker - Greiner skygger for belysning",
            "kartlagKobling": "Tredata"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "79d9c61d-6d20-796e-3bb8-c458372179d9",
                "navn": "Greiner skygger for belysning"
            },
            {
                "meldingskategoriId": "fd0d61c8-7b50-0b3e-7d01-159a14c87318",
                "navn": "Beskjæring, trimming av trær/busker"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "142aac62-a71d-4daa-9a2a-1197039ff744",
            "navn": "Manglende vanning",
            "beskrivelse": "Skøytebane - Manglende vanning",
            "kartlagKobling": "Kunstisbaner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "96137cc6-a2e4-9ef5-9f5e-1b730caa0ce7",
                "navn": "Manglende vanning"
            },
            {
                "meldingskategoriId": "0626fc05-124c-9c79-7f04-d9849b663c5c",
                "navn": "Skøytebane"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "2372bf12-523b-4a33-b57f-5db7e486418b",
            "navn": "Visningsskilt til severdighet",
            "beskrivelse": "Skilt - Visningsskilt til severdighet",
            "kartlagKobling": "SkiltVeier"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "af6b7c95-91df-4bc4-731a-1fe5358a64a6",
                "navn": "Visningsskilt til severdighet"
            },
            {
                "meldingskategoriId": "fe59516d-9ccd-3775-9ed0-bf394b992cb8",
                "navn": "Skilt"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "d16fc4bc-fcf8-4751-9508-1f104f0f505e",
            "navn": "Skilt i park/friområde",
            "beskrivelse": "Skilt - Skilt i park/friområde",
            "kartlagKobling": "SkiltVeierParker"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "f5c73e5a-189c-052a-7524-5cfc9d3482a4",
                "navn": "Park/friområde"
            },
            {
                "meldingskategoriId": "fe59516d-9ccd-3775-9ed0-bf394b992cb8",
                "navn": "Skilt"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "149b2f17-cf71-421b-95dc-4b353304c162",
            "navn": "Skader/mangler",
            "beskrivelse": "Toaletter - Skader/mangler",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "1074cec1-68f3-4837-0785-28542be19775",
                "navn": "Toaletter"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "9c780e3e-e65c-41f8-837e-facbb47bfc55",
            "navn": "Skadet armatur",
            "beskrivelse": "Gatelys - Skadet armatur",
            "kartlagKobling": "Armatur"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "c332f8d9-8ba8-75d7-6847-67a36f3a63e3",
                "navn": "Gatelys"
            },
            {
                "meldingskategoriId": "6c18cc6f-03fb-891e-5289-14073c7c94c6",
                "navn": "Skadet armatur"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "1ae04adf-c5e8-413f-bc1c-51b72f63f46e",
            "navn": "Registrering villfylling/hageavfall",
            "beskrivelse": "Søppel - Registrering villfylling/hageavfall",
            "kartlagKobling": "Villfylling"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "24de366d-8493-1cc9-1d8e-2669705c0a3e",
                "navn": "Søppel"
            },
            {
                "meldingskategoriId": "1c12f394-9c7b-0140-6941-55f62af55c60",
                "navn": "Registrering villfylling/hageavfall"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "1f5d2abb-5ec1-45c4-adb0-1e206e58ae14",
            "navn": "Bussbom",
            "beskrivelse": "Bommer - Bussbom",
            "kartlagKobling": "VeierRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "314d6412-84d9-5955-7cc4-8b0f904b7156",
                "navn": "Bussbom"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "3d46fcab-62a4-42ed-aff5-2ea2133f814d",
            "navn": "Fremmed art - kjempebjørnekjeks",
            "beskrivelse": "Biologisk mangfold - Fremmed art - kjempebjørnekjeks",
            "kartlagKobling": "Mangfold"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "50689dfc-5d37-2f57-42c6-4c26386626a9",
                "navn": "Biologisk mangfold"
            },
            {
                "meldingskategoriId": "ec00cddd-542b-2209-9bd6-15ba4f3d70a8",
                "navn": "Fremmed art - kjempebjørnekjeks"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "135ace8f-35d0-47d8-88fe-522393741694",
            "navn": "Veibane",
            "beskrivelse": "Brøyting/strøing - Veibane",
            "kartlagKobling": "VeierRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "e4e1f3e4-3dc0-1bc5-77af-facf460a5c89",
                "navn": "Brøyting/strøing"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "aef5ed0e-4ab0-42f7-b49f-3c3c38b4d6ea",
            "navn": "Renhold",
            "beskrivelse": "Bymøbel - Renhold",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "f22e60f1-60cf-833b-6486-e9c36be49e55",
                "navn": "Bymøbel"
            },
            {
                "meldingskategoriId": "b7abf69e-4ae7-851c-8efe-4277a79a8feb",
                "navn": "Renhold"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "289f7fb6-cd34-4329-9273-d9ef7c114f2e",
            "navn": "Tett/skadet sluk",
            "beskrivelse": "Sluk, kummer og lokk - Tett/skadet sluk",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "2f5117af-8aa9-1471-2cf2-c2cf8f6c35c3",
                "navn": "Sluk, kummer og lokk"
            },
            {
                "meldingskategoriId": "73a44a2d-5a06-4e23-1975-9faa25f416fd",
                "navn": "Tett/skadet sluk"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "314aee7b-e59c-4f95-a313-8cf7faa35fcc",
            "navn": "Lyser på dagen",
            "beskrivelse": "Gatelys - Lyser på dagen",
            "kartlagKobling": "Armatur"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "c332f8d9-8ba8-75d7-6847-67a36f3a63e3",
                "navn": "Gatelys"
            },
            {
                "meldingskategoriId": "f355e4cf-1ebe-a65a-a52f-8694ebbf4728",
                "navn": "Lyser på dagen"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "f98ef9f5-7e04-40d9-b50c-c20612652e27",
            "navn": "Skadet ledning",
            "beskrivelse": "Gatelys - Skadet ledning",
            "kartlagKobling": "Armatur"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "89210958-10ed-05f3-02c2-035076fc4a79",
                "navn": "Skadet ledning"
            },
            {
                "meldingskategoriId": "c332f8d9-8ba8-75d7-6847-67a36f3a63e3",
                "navn": "Gatelys"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "a7e76356-54cf-454c-84fb-68a40e6869bd",
            "navn": "Tidsintervall",
            "beskrivelse": "Signalanlegg - Tidsintervall",
            "kartlagKobling": "Signalanlegg"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "7ac79d8b-3aa1-a1ab-9e3d-53c094d80f17",
                "navn": "Tidsintervall"
            },
            {
                "meldingskategoriId": "1dbd34b8-0062-6e5f-205b-a78f5c89a4d3",
                "navn": "Signalanlegg"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "02db6222-0743-4368-8539-09f82534bdb4",
            "navn": "Tur-, gang- og sykkelvei",
            "beskrivelse": "Renhold - Tur-, gang- og sykkelvei",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "b7abf69e-4ae7-851c-8efe-4277a79a8feb",
                "navn": "Renhold"
            },
            {
                "meldingskategoriId": "89025928-41cd-557f-625d-02267fb242a2",
                "navn": "Tur-, gang- og sykkelvei"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "d29f886c-5c51-419b-b635-5d5ce343d01c",
            "navn": "P-plass",
            "beskrivelse": "Hull i veien - P-plass",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "7c1107c0-4921-555e-1fd3-4c96400c18d8",
                "navn": "Hull"
            },
            {
                "meldingskategoriId": "dff56306-7923-99f2-62bb-5f4dddea8818",
                "navn": "P-plass"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "e081d98a-6328-484d-809e-6e055753143c",
            "navn": "Veibane",
            "beskrivelse": "Hull i veien - Veibane",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "7c1107c0-4921-555e-1fd3-4c96400c18d8",
                "navn": "Hull"
            },
            {
                "meldingskategoriId": "7b01fd64-7bd6-2b18-9635-9e12f31c400d",
                "navn": "Veibane"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "b598b3e2-95af-49f8-a122-cf29d3add2af",
            "navn": "P-plass",
            "beskrivelse": "Renhold - P-plass",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "dff56306-7923-99f2-62bb-5f4dddea8818",
                "navn": "P-plass"
            },
            {
                "meldingskategoriId": "b7abf69e-4ae7-851c-8efe-4277a79a8feb",
                "navn": "Renhold"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "53d94d93-b05e-40b4-a037-f35e653dff68",
            "navn": "Tur-, gang og sykkelvei",
            "beskrivelse": "Brøyting/strøing - Tur-, gang og sykkelvei",
            "kartlagKobling": "VeierRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "89025928-41cd-557f-625d-02267fb242a2",
                "navn": "Tur-, gang- og sykkelvei"
            },
            {
                "meldingskategoriId": "e4e1f3e4-3dc0-1bc5-77af-facf460a5c89",
                "navn": "Brøyting/strøing"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "710da443-87f6-4b0b-aaf1-d4616fc637d5",
            "navn": "Mørkt område minst 4 stk",
            "beskrivelse": "Gatelys - Mørkt område minst 4 stk",
            "kartlagKobling": "Armatur"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "c332f8d9-8ba8-75d7-6847-67a36f3a63e3",
                "navn": "Gatelys"
            },
            {
                "meldingskategoriId": "a6a082ef-73ec-264d-8570-c6661a3aa13b",
                "navn": "Mørkt område (min. 4 stk)"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "71903d1e-7377-4a65-a9a5-3dd9e575faeb",
            "navn": "Feil/mangler",
            "beskrivelse": "Lekeplass - Feil/mangler",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "8a8a2ada-7725-1907-4b5d-6da2ea8d19e2",
                "navn": "Lekeplass"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "2521a526-9cef-408f-b02c-797e1a618434",
            "navn": "Skadet mast",
            "beskrivelse": "Gatelys - Skadet mast",
            "kartlagKobling": "Armatur"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "c332f8d9-8ba8-75d7-6847-67a36f3a63e3",
                "navn": "Gatelys"
            },
            {
                "meldingskategoriId": "b0a044d4-5ac4-3421-80f7-cb27292700ac",
                "navn": "Skadet mast"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "ed0f377b-fc91-4c84-a5c6-22dcfbe70fdf",
            "navn": "Registrering ønske om søppelkasse",
            "beskrivelse": "Søppel - Registrering ønske om søppelkasse",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "24de366d-8493-1cc9-1d8e-2669705c0a3e",
                "navn": "Søppel"
            },
            {
                "meldingskategoriId": "2a5c4e9f-4049-0b90-786e-9b8a022c9f0f",
                "navn": "Registrering ønske om søppelkasse"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "3507e0e5-7ed8-451d-9065-ae05aac4a62d",
            "navn": "Gjengrodd sti/turvei",
            "beskrivelse": "Beskjæring/trimming av trær/busker - Gjengrodd sti/turvei",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "5cb8695a-84ef-a654-3fd8-eb4460235aa0",
                "navn": "Gjengrodd sti/turvei"
            },
            {
                "meldingskategoriId": "fd0d61c8-7b50-0b3e-7d01-159a14c87318",
                "navn": "Beskjæring, trimming av trær/busker"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "7fc95d70-43c7-458a-977e-cbdba1e0cb3b",
            "navn": "Renhold",
            "beskrivelse": "Toaletter - Renhold",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "b7abf69e-4ae7-851c-8efe-4277a79a8feb",
                "navn": "Renhold"
            },
            {
                "meldingskategoriId": "1074cec1-68f3-4837-0785-28542be19775",
                "navn": "Toaletter"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "d4734033-49c1-4140-a650-6d4afed1cf3c",
            "navn": "Firkantete lokk som slår",
            "beskrivelse": "Sluk, kummer og lokk - Firkantete lokk som slår",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "2f5117af-8aa9-1471-2cf2-c2cf8f6c35c3",
                "navn": "Sluk, kummer og lokk"
            },
            {
                "meldingskategoriId": "4e4e9728-21ce-34ee-13cc-e71a33e75c4d",
                "navn": "Firkantete lokk som slår"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "9f911589-3826-4295-9cd3-e63af9258451",
            "navn": "Andre mangler",
            "beskrivelse": "Holdeplasser - Andre mangler",
            "kartlagKobling": "VeierRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "a96672b8-91b8-841c-2209-58091e056e9c",
                "navn": "Holdeplass"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "6389c535-d66f-4f4a-b59e-70ab827e7dea",
            "navn": "Søppel på holdeplass",
            "beskrivelse": "Søppel - Søppel på holdeplass",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "24de366d-8493-1cc9-1d8e-2669705c0a3e",
                "navn": "Søppel"
            },
            {
                "meldingskategoriId": "a96672b8-91b8-841c-2209-58091e056e9c",
                "navn": "Holdeplass"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "10895bfa-8814-454a-8575-8770b8c64d50",
            "navn": "Brekkasje",
            "beskrivelse": "Trær - Brekkasje",
            "kartlagKobling": "Tredata"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "6af7971b-7d29-0bf2-011e-89610c8f0bf9",
                "navn": "Trær"
            },
            {
                "meldingskategoriId": "0becab25-6d36-65ab-a1e6-a20c0f3d0d71",
                "navn": "Brekkasje"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "03bddaed-51ff-4df8-a10e-8a9111390c29",
            "navn": "Annet",
            "beskrivelse": "Gatelys - Annet",
            "kartlagKobling": "Armatur"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "c332f8d9-8ba8-75d7-6847-67a36f3a63e3",
                "navn": "Gatelys"
            },
            {
                "meldingskategoriId": "fc5a720a-a16f-83e3-1add-c748e6891613",
                "navn": "Annet"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "ad5977d9-8f01-4120-b363-c43b4c8a56a4",
            "navn": "Greiner skygger for belysning",
            "beskrivelse": "Gatelys - Greiner skygger for belysning",
            "kartlagKobling": "Armatur"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "c332f8d9-8ba8-75d7-6847-67a36f3a63e3",
                "navn": "Gatelys"
            },
            {
                "meldingskategoriId": "79d9c61d-6d20-796e-3bb8-c458372179d9",
                "navn": "Greiner skygger for belysning"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "7feefdf7-2970-4ba1-bdff-62062dd5cd62",
            "navn": "Veibane",
            "beskrivelse": "Renhold - Veibane",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "7b01fd64-7bd6-2b18-9635-9e12f31c400d",
                "navn": "Veibane"
            },
            {
                "meldingskategoriId": "b7abf69e-4ae7-851c-8efe-4277a79a8feb",
                "navn": "Renhold"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "dbde242f-8bad-42ac-b332-611b1672628b",
            "navn": "Blunker",
            "beskrivelse": "Gatelys - Blunker",
            "kartlagKobling": "Armatur"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "c332f8d9-8ba8-75d7-6847-67a36f3a63e3",
                "navn": "Gatelys"
            },
            {
                "meldingskategoriId": "ec215133-2077-748a-408b-0b7b2b2e4d23",
                "navn": "Blunker"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "f0aa4e9a-8957-4c1e-b21d-200d326893e3",
            "navn": "Brygge/badetrapp",
            "beskrivelse": "Badeplass - Brygge/badetrapp",
            "kartlagKobling": "ParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "1691c593-2444-4482-90eb-47b6edfbae95",
                "navn": "Brygge"
            },
            {
                "meldingskategoriId": "08660077-92ce-0670-3f92-232117d2101d",
                "navn": "Badeplass"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "2b39cb2a-c4a0-42aa-9624-9739aef6850f",
            "navn": "Sykkelfelt",
            "beskrivelse": "Brøyting/strøing - Sykkelfelt",
            "kartlagKobling": "VeierRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "e4e1f3e4-3dc0-1bc5-77af-facf460a5c89",
                "navn": "Brøyting/strøing"
            },
            {
                "meldingskategoriId": "18df8597-117f-9da4-6e4a-6a1db42b267a",
                "navn": "Sykkelfelt"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "9ba9e22e-90da-4c95-bd14-746109af9c91",
            "navn": "Etterfylling av forbruksvarer",
            "beskrivelse": "Toaletter - Etterfylling av forbruksvarer",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "a9989e3b-3ff8-2326-02eb-1950044c9625",
                "navn": "Etterfylling av forbruksvarer"
            },
            {
                "meldingskategoriId": "1074cec1-68f3-4837-0785-28542be19775",
                "navn": "Toaletter"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "cadb8fa6-a949-4c98-bc35-9b8caa9e6c88",
            "navn": "Fulle søppelkasser",
            "beskrivelse": "Holdeplasser - Fulle søppelkasser",
            "kartlagKobling": "Veier"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "df29142a-6d9b-7ee7-0b54-f2317f097ae4",
                "navn": "Fulle søppelkasser"
            },
            {
                "meldingskategoriId": "a96672b8-91b8-841c-2209-58091e056e9c",
                "navn": "Holdeplass"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "383235cc-9c77-474f-bd40-c3e178af111c",
            "navn": "Sykkelfelt",
            "beskrivelse": "Renhold - Sykkelfelt",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "b7abf69e-4ae7-851c-8efe-4277a79a8feb",
                "navn": "Renhold"
            },
            {
                "meldingskategoriId": "18df8597-117f-9da4-6e4a-6a1db42b267a",
                "navn": "Sykkelfelt"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "56606b6c-e362-4b2e-b9dd-d41613dce7b5",
            "navn": "Holdeplass",
            "beskrivelse": "Brøyting/strøing - Holdeplass",
            "kartlagKobling": "VeierRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "a96672b8-91b8-841c-2209-58091e056e9c",
                "navn": "Holdeplass"
            },
            {
                "meldingskategoriId": "e4e1f3e4-3dc0-1bc5-77af-facf460a5c89",
                "navn": "Brøyting/strøing"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "c946eb02-defc-4b3d-a7d3-dbd55486f41c",
            "navn": "Hindrer sikt til skilt/signalanlegg",
            "beskrivelse": "Trær - Hindrer sikt til skilt/signalanlegg",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "ebd5c5bc-6143-3200-51de-a566df2f27b2",
                "navn": "Risiko"
            },
            {
                "meldingskategoriId": "6af7971b-7d29-0bf2-011e-89610c8f0bf9",
                "navn": "Trær"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "740fead8-61ee-473f-8b8f-683b92a73ba1",
            "navn": "Mørkt anlegg",
            "beskrivelse": "Signalanlegg - Mørkt anlegg",
            "kartlagKobling": "Signalanlegg"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "4f914e2e-5cef-1141-97b0-1d4eeb5e8664",
                "navn": "Mørkt anlegg"
            },
            {
                "meldingskategoriId": "1dbd34b8-0062-6e5f-205b-a78f5c89a4d3",
                "navn": "Signalanlegg"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "2f945273-0696-423a-911c-6a54d8d42549",
            "navn": "Stranddusj",
            "beskrivelse": "Badeplass - Stranddusj",
            "kartlagKobling": "ParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "71367413-4ea1-a383-69f5-212e35905903",
                "navn": "Stranddusj"
            },
            {
                "meldingskategoriId": "08660077-92ce-0670-3f92-232117d2101d",
                "navn": "Badeplass"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "a560bd97-f3a1-4422-a6ab-f69a5db8cd74",
            "navn": "Manglende/skadet gatenavnskilt",
            "beskrivelse": "Skilt - Manglende/skadet gatenavnskilt",
            "kartlagKobling": "SkiltGatenavn"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "66a8ced6-7825-2ccf-1a79-e0eea0a62ff8",
                "navn": "Manglende/skadet gatenavnskilt"
            },
            {
                "meldingskategoriId": "fe59516d-9ccd-3775-9ed0-bf394b992cb8",
                "navn": "Skilt"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "f9899f89-273f-4af6-9b5b-bc2d3df52baa",
            "navn": "Trafikkøyer og rundkjøringer",
            "beskrivelse": "Gressklipping - Trafikkøyer og rundkjøringer",
            "kartlagKobling": "Gressklipping"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "5a52e64b-6ad2-7b44-2a79-8ed116fd82f8",
                "navn": "Trafikkøyer og rundkjøringer"
            },
            {
                "meldingskategoriId": "c56b4e55-1583-62ca-1b71-7c160c142d5d",
                "navn": "Gressklipping"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "321fb626-e4b6-4b6c-b1eb-d0921c0bd136",
            "navn": "Tagging",
            "beskrivelse": "Tagging - Tagging",
            "kartlagKobling": "Veier"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "6e3b6bf5-5cc5-1de4-48b5-7ef4021c6dc4",
                "navn": "Tagging"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "51cb10f3-f6de-4d85-8547-bfaffc793274",
            "navn": "Blinker gult",
            "beskrivelse": "Signalanlegg - Blinker gult",
            "kartlagKobling": "Signalanlegg"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "1dbd34b8-0062-6e5f-205b-a78f5c89a4d3",
                "navn": "Signalanlegg"
            },
            {
                "meldingskategoriId": "9f9259fd-398c-6e35-3453-29d1385042f7",
                "navn": "Blinker gult"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "f673ed3e-6633-4a0c-a6c9-218065af6cbf",
            "navn": "Risiko",
            "beskrivelse": "Lekeplass - Risiko",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "ebd5c5bc-6143-3200-51de-a566df2f27b2",
                "navn": "Risiko"
            },
            {
                "meldingskategoriId": "8a8a2ada-7725-1907-4b5d-6da2ea8d19e2",
                "navn": "Lekeplass"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "2a201ce8-0736-4a7c-a56d-305058de9b51",
            "navn": "Overhengende/lave greiner/busker",
            "beskrivelse": "Trær - Overhengende/lave greiner/busker",
            "kartlagKobling": "Tredata"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "6af7971b-7d29-0bf2-011e-89610c8f0bf9",
                "navn": "Trær"
            },
            {
                "meldingskategoriId": "19893b59-2930-25e3-8a4e-0ebb665d23fc",
                "navn": "Overhengende/lave greiner/busker"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "48ae1118-2055-4418-9ebe-704b712193c2",
            "navn": "Langs trikkeskinner",
            "beskrivelse": "Hull i veien - Langs trikkeskinner",
            "kartlagKobling": "Trikkeskinner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "7c1107c0-4921-555e-1fd3-4c96400c18d8",
                "navn": "Hull"
            },
            {
                "meldingskategoriId": "9c68ef81-239a-a4f1-898f-2b4c76328d2e",
                "navn": "Trikkeskinner"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "8e20a409-166b-44da-9c08-737ff2d35c4e",
            "navn": "Holdeplass",
            "beskrivelse": "Renhold - Holdeplass",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "a96672b8-91b8-841c-2209-58091e056e9c",
                "navn": "Holdeplass"
            },
            {
                "meldingskategoriId": "b7abf69e-4ae7-851c-8efe-4277a79a8feb",
                "navn": "Renhold"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "b4652c1e-d3b7-4e6f-905b-3341da24f80f",
            "navn": "Annet",
            "beskrivelse": "Signalanlegg - Annet",
            "kartlagKobling": "Signalanlegg"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "1dbd34b8-0062-6e5f-205b-a78f5c89a4d3",
                "navn": "Signalanlegg"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "beaa22e9-4201-4a9d-b7f2-b8361a989f89",
            "navn": "Bommer",
            "beskrivelse": "Bommer - Bommer",
            "kartlagKobling": "VeierRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "1c019523-6d89-5c89-a3c1-b0656a595c37",
                "navn": "Bommer"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "ece8ee84-16f5-43d5-87d4-bc6a22ff307d",
            "navn": "Tur-, gang- og sykkelvei",
            "beskrivelse": "Hull i veien - Tur-, gang- og sykkelvei",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "7c1107c0-4921-555e-1fd3-4c96400c18d8",
                "navn": "Hull"
            },
            {
                "meldingskategoriId": "89025928-41cd-557f-625d-02267fb242a2",
                "navn": "Tur-, gang- og sykkelvei"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "fb9b6389-bf89-4a52-86fd-30e796e0a496",
            "navn": "Skadet skjerm",
            "beskrivelse": "Gatelys - Skadet skjerm",
            "kartlagKobling": "Armatur"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "c332f8d9-8ba8-75d7-6847-67a36f3a63e3",
                "navn": "Gatelys"
            },
            {
                "meldingskategoriId": "7605546d-a40c-6276-5819-b8344dd16d02",
                "navn": "Skadet skjerm"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "a6ee6d88-e6b5-4ef0-a38c-138de9972055",
            "navn": "Fremmed art - russekål",
            "beskrivelse": "Biologisk mangfold - Fremmed art - russekål",
            "kartlagKobling": "Mangfold"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "f246207a-9317-8646-6be2-4c930eb47773",
                "navn": "Fremmed art - russekål"
            },
            {
                "meldingskategoriId": "50689dfc-5d37-2f57-42c6-4c26386626a9",
                "navn": "Biologisk mangfold"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "98e3092e-d5e2-4645-97db-8ce647d160ed",
            "navn": "Hindrer sikt til skilt/signalanlegg",
            "beskrivelse": "Beskjæring/trimming av trær/busker - Hindrer sikt til skilt/signalanlegg",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "1dbd34b8-0062-6e5f-205b-a78f5c89a4d3",
                "navn": "Signalanlegg"
            },
            {
                "meldingskategoriId": "fd0d61c8-7b50-0b3e-7d01-159a14c87318",
                "navn": "Beskjæring, trimming av trær/busker"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "e6678d52-3c1d-47c7-974b-fce9b5f09210",
            "navn": "Vannpost/kran",
            "beskrivelse": "Badeplass - Vannpost/kran",
            "kartlagKobling": "ParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "fcaa4b3c-51ef-40a7-a32b-239d62832478",
                "navn": "Kran"
            },
            {
                "meldingskategoriId": "08660077-92ce-0670-3f92-232117d2101d",
                "navn": "Badeplass"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "a4ddd04b-01cc-4a6e-96d6-167e4d51fb67",
            "navn": "Turveiskilt",
            "beskrivelse": "Skilt - Turveiskilt",
            "kartlagKobling": "SkiltVeierParker"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "fe59516d-9ccd-3775-9ed0-bf394b992cb8",
                "navn": "Skilt"
            },
            {
                "meldingskategoriId": "89025928-41cd-557f-625d-02267fb242a2",
                "navn": "Tur-, gang- og sykkelvei"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "41759ee2-7dba-43f2-8b0b-8a9b47af194f",
            "navn": "Fulle søppelkasser",
            "beskrivelse": "Søppel - Fulle søppelkasser",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "24de366d-8493-1cc9-1d8e-2669705c0a3e",
                "navn": "Søppel"
            },
            {
                "meldingskategoriId": "df29142a-6d9b-7ee7-0b54-f2317f097ae4",
                "navn": "Fulle søppelkasser"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "8ca63eea-b870-4211-ba13-2132269e4f8d",
            "navn": "Vedlikehold",
            "beskrivelse": "Bymøbel - Vedlikehold",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "f22e60f1-60cf-833b-6486-e9c36be49e55",
                "navn": "Bymøbel"
            },
            {
                "meldingskategoriId": "86be0286-516f-69f0-a37d-fbd0b5701d5b",
                "navn": "Vedlikehold"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "fd9208f5-11e5-43b2-b0f9-d96f1bdb9fe0",
            "navn": "Midlertidig skilting",
            "beskrivelse": "Skilt - Midlertidig skilting",
            "kartlagKobling": "SkiltVeierParker"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "fd667da0-112b-857a-9ea0-2af9df345e8c",
                "navn": "Midlertidig skilting"
            },
            {
                "meldingskategoriId": "fe59516d-9ccd-3775-9ed0-bf394b992cb8",
                "navn": "Skilt"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "6e6078e5-f479-4800-90d3-08b465b95885",
            "navn": "Mørk lampe/mørkt område",
            "beskrivelse": "Gatelys - Mørk lampe/mørkt område",
            "kartlagKobling": "Armatur"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "c332f8d9-8ba8-75d7-6847-67a36f3a63e3",
                "navn": "Gatelys"
            },
            {
                "meldingskategoriId": "176cd72a-39d9-2fd7-1ccf-d2bdcd3849c8",
                "navn": "Mørk lampe"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "37435ce1-8697-41ef-ae64-d2e3b926e274",
            "navn": "Fortau",
            "beskrivelse": "Hull i veien - Fortau",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "7c1107c0-4921-555e-1fd3-4c96400c18d8",
                "navn": "Hull"
            },
            {
                "meldingskategoriId": "a8c1fa9b-2ad6-8d4f-5e56-b32f0013228a",
                "navn": "Fortau"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "5d75367b-96dd-4a89-bedc-7ecb3769a5c1",
            "navn": "Ønske om nytt tre",
            "beskrivelse": "Trær - Ønske om nytt tre",
            "kartlagKobling": "Veier"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "4ec27466-1fba-3581-1ea8-bc11cea15191",
                "navn": "Ønske om nytt tre"
            },
            {
                "meldingskategoriId": "6af7971b-7d29-0bf2-011e-89610c8f0bf9",
                "navn": "Trær"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "8b7856bc-9003-4bb7-aea7-6562fdb68721",
            "navn": "Parkeringsskilt",
            "beskrivelse": "Skilt - Parkeringsskilt",
            "kartlagKobling": "SkiltVeier"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "02f293e7-87c4-0ece-9100-effaa31c280c",
                "navn": "Parkeringsskilt"
            },
            {
                "meldingskategoriId": "fe59516d-9ccd-3775-9ed0-bf394b992cb8",
                "navn": "Skilt"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "f15534ce-fe34-4497-b667-33ab56482332",
            "navn": "Søppel i park",
            "beskrivelse": "Søppel - Søppel i park",
            "kartlagKobling": "VeierParkerRegioner"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "24de366d-8493-1cc9-1d8e-2669705c0a3e",
                "navn": "Søppel"
            },
            {
                "meldingskategoriId": "f5c73e5a-189c-052a-7524-5cfc9d3482a4",
                "navn": "Park/friområde"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "6354d6a1-8988-45c4-8c34-a2414c01d1cf",
            "navn": "Feil/mangler",
            "beskrivelse": "Idrettsutstyr - Feil/mangler",
            "kartlagKobling": "ParkerIdrett"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "83b5ec01-8f2f-087e-8f6a-7c51c58d4d4e",
                "navn": "Idrettsutstyr"
            }
        ]
    }
]
