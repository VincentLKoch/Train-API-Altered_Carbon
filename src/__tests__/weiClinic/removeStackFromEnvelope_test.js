import { getClinic } from '../../weiClinic.js'


describe('removeStackFromEnvelope test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()

    })

    it('Test Working', () => {
        weiClinic.stacks = [{ id: 1, idEnvelope: 1 }]
        weiClinic.envelopes = [{ id: 1, idStack: 1 }]

        weiClinic.removeStackFromEnvelope(1)

        expect(weiClinic.stacks[0].idEnvelope).toBeNull()
        expect(weiClinic.envelopes[0].idStack).toBeNull()
    });
    
    it('Stack not found', () => {
        weiClinic.stacks = []
        expect(() => { weiClinic.removeStackFromEnvelope(1) }).toThrow("rm1")
    });

    it("Stack don't have envelope", () => {
        weiClinic.stacks = [{ id: 1, idEnvelope: null }]
        expect(() => { weiClinic.removeStackFromEnvelope(1) }).toThrow("rm2")
    });

    it("Can't find stack's envelope", () => {
        weiClinic.stacks = [{ id: 1, idEnvelope: 1 }]
        weiClinic.envelopes = []

        expect(() => { weiClinic.removeStackFromEnvelope(1) }).toThrow("rm3")
    });
})
