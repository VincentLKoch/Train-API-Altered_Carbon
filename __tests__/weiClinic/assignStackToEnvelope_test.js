import { getClinic } from '../../weiClinic.js'


describe('weiClinic test', () => {
    var weiClinic

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

    it('Test Throwing', () => {
        weiClinic.stacks = [{ id: 1, idEnvelope: 1 }]

        expect(function () { weiClinic.assignStackToEnvelope(10) }).toThrow("ad1")
    });

})

/*
assignStackToEnvelope(idStack, idEnvelope) {
    const stack = this.stacks.find(sta => { return sta.id == idStack })

    if (!stack) {
        throw "ad1" //400
    }

    let envelope
    if (idEnvelope) {
        envelope = this.envelopes.find(env => { return env.id == idEnvelope })
        if (!envelope) { throw "ad2" } //400
        if (!envelope.idStack === null) { throw "ad3" } //envelope already have a stack, error 400

    } else {
        envelope = this.envelopes.find(env => { return env.idStack === null })
        if (!envelope) { throw "ad4" } //404
    }

    envelope.idStack = stack.id
    stack.idEnvelope = envelope.id
} */