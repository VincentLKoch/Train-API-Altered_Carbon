import { getClinic } from '../../weiClinic.js'


describe('Destroy Stack test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()

    })

    it('Test Working', () => {
        weiClinic.envelopes = [{ id: 1, idStack: null }]

        weiClinic.destroyStack(1)

        expect(weiClinic.envelopes[1]).toBeUndefined()
    });

    it('The stack is not finded', () => {
        weiClinic.stack = [{ id: 1, idEnvelope: null}]

        expect(() => { weiClinic.destroyStack(3)}).toThrow("ds")
    });

})