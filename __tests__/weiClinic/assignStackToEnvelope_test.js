import { getClinic } from '../../weiClinic.js'


describe('assignStackToEnvelope test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()

    })

    it('Test Working', () => {
        weiClinic.stacks = [{ id: 1, idEnvelope: null }]
        weiClinic.envelopes = [{ id: 1, idStack: null }]

        weiClinic.assignStackToEnvelope(1)

        expect(weiClinic.stacks[0].idEnvelope).toBe(1)
        expect(weiClinic.envelopes[0].idStack).toBe(1)
    });

    it('Stack not found', () => {
        weiClinic.stacks = []
        expect(() => { weiClinic.assignStackToEnvelope(1) }).toThrow("ad1")
    });

    it('Stack already inside a envelope', () => {
        weiClinic.stacks = [{ id: 1, idEnvelope: 1 }]
        expect(() => { weiClinic.assignStackToEnvelope(1) }).toThrow("ad2")
    });

    it("Can't find given envelope", () => {
        weiClinic.stacks = [{ id: 1, idEnvelope: null }]
        weiClinic.envelopes = []

        expect(() => { weiClinic.assignStackToEnvelope(1, 1) }).toThrow("ad3")
    });

    it('Given envelope is used', () => {
        weiClinic.stacks = [{ id: 1, idEnvelope: null }]
        weiClinic.envelopes = [{ id: 1, idStack: 2 }]
        expect(() => { weiClinic.assignStackToEnvelope(1, 1) }).toThrow("ad4")
    });

    it('No envelope empty1', () => {
        weiClinic.stacks = [{ id: 1, idEnvelope: null }]
        weiClinic.envelopes = []
        expect(() => { weiClinic.assignStackToEnvelope(1) }).toThrow("ad5")
    });

    it('No envelope empty2', () => {
        weiClinic.stacks = [{ id: 1, idEnvelope: null }]
        weiClinic.envelopes = [{ id: 1, idStack: 2 }, { id: 3, idStack: 5 }]
        expect(() => { weiClinic.assignStackToEnvelope(1) }).toThrow("ad5")
    });
})
