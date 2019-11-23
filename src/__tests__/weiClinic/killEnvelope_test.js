import { getClinic } from '../../weiClinic.js'


describe('Kill test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()

    })

    it('The enveloppe is killed', () => {
        weiClinic.envelopes = [{ id: 1, idStack: null }]

        weiClinic.killEnvelope(1)

        expect(weiClinic.envelopes[0]).toBeUndefined()
    });

    it('The enveloppe is killed and we keep the stack', () => {
        weiClinic.envelopes = [{ id: 1, idStack: 1 }]
        weiClinic.stacks = [{ id: 1, idEnvelope: 1 }]

        weiClinic.killEnvelope(1)

        expect(weiClinic.envelopes).toEqual([])
        expect(weiClinic.stacks[0].idEnvelope).toBeNull()
    });

    it('The enveloppe is not finded', () => {
        weiClinic.envelopes = []

        expect(() => { weiClinic.killEnvelope(3) }).toThrow("kil")
    });


})