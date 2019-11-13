import { getClinic } from '../../weiClinic.js'


describe('Destroy Stack test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()

    })

    it('The stack is destroyed', () => {
        weiClinic.stacks = [{ id: 1, idEnvelope: null }]

        weiClinic.destroyStack(1)

        expect(weiClinic.envelopes[1]).toBeUndefined()
    });

    it('The stack and the envelope are destroyed', () => {
        weiClinic.envelopes = [{ id: 1, idStack: 1 }]
        weiClinic.stacks = [{ id: 1, idEnvelope: 1 }]

        weiClinic.destroyStack(1)

        expect(weiClinic.stacks).toEqual([])
        expect(weiClinic.envelopes).toEqual([])
    });

    it('The stack is not finded', () => {
        weiClinic.stacks = []

        expect(() => { weiClinic.destroyStack(3) }).toThrow("ds")
    });

})