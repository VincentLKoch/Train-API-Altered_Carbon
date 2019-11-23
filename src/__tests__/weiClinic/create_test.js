import { getClinic } from '../../weiClinic.js'

describe('removeStackFromEnvelope test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()
    })

    it('Test create n°1', () => {
        weiClinic.stacks = []
        weiClinic.envelopes = []

        //weiClinic.create("M", "Toto", 8)

        expect(weiClinic.envelopes).toEqual([{ id: 1, gender: 'M', age: 8, idStack: 1 }])
        expect(weiClinic.stacks).toEqual([{ id: 1, name: 'Toto', age: 8, idEnvelope: 1, realGender: 'M' }])
    });

    it('Test create n°2', () => {
        weiClinic.stacks = [{ id: 1 }]
        weiClinic.envelopes = [{ id: 1 }]

        //weiClinic.create("M", "Toto", 8)

        expect(weiClinic.envelopes).toEqual([{ id: 1 }, { id: 2, gender: 'M', age: 8, idStack: 2 }])
        expect(weiClinic.stacks).toEqual([{ id: 1 }, { id: 2, name: 'Toto', age: 8, idEnvelope: 2, realGender: 'M' }])
    });

})
