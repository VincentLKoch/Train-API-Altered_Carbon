import { getNewId } from './idHelper'
import CorticalStack from './corticalStack'
import Envelope from './Envelope'
class WeiClinic {
    constructor() {
        this.envelopes = []
        this.stacks = []
    }

    create(realGender, name, age) {
        const stackId = getNewId(this.stacks)
        const envelopeId = getNewId(this.envelopes)
        const newStack = new CorticalStack(stackId, realGender, name, age, envelopeId)
        const newEnvelope = new Envelope(envelopeId, realGender, age, stackId)
        this.stacks.push(newStack)
        this.envelopes.push(newEnvelope)
        return {
            corticalStack: newStack,
            envelope: newEnvelope
        }
    }

    assignStackToEnvelope(idStack, idEnvelope) {
        const stack = this.stacks[idStack]

        if (!stack) {
            throw "ad1" //400
        }

        if (idEnvelope) {
            const envelope = this.envelopes[idEnvelope]
            if (!envelope) { throw "ad2" } //400
            if (!envelope.idStack) { throw "ad3" } //400

        } else {
            const envelope = this.envelopes.find(obj => { return obj.idStack === null })
            if (!envelope) { throw "ad4" } //404
        }

        envelope.idStack = stack.id
        stack.idEnvelope = envelope.id
    }

    removeStackFromEnvelope(idStack, idEnvelope) {
        const stack = this.stacks[idStack]
        if (!stack) {
            throw "rm1"
        }

        const envelope = this.envelopes[idEnvelope] || this.envelopes[stack.idEnvelope]
        if (!envelope) {
            throw "rm2"
        }

        envelope.idStack = null
        stack.idEnvelope = null
    }

    killEnvelope(idEnvelope) {
        const envelope = this.envelopes[idEnvelope]
        if (!envelope) {
            throw "kil"
        }


        if (envelope.idStack) {
            // this.stacks[envelope.idStack].idEnvelope = null
            const stack = this.stacks[envelope.idStack]
            stack.idEnvelope = null;
        }

        this.envelopes.splice(idEnvelope, 1)
    }

    destroyStack(idStack) {
        const stack = this.stacks[idStack]
        if (!stack || !stack.idEnvelope) {
            throw "ds"
        }
        if (stack.idEnvelope) {
            const envelope = this.envelopes[stack.idEnvelope]
            envelope.idStack = null;
        }

        this.stacks.splice(idStack, 1)
    }
}
const weiClinic = new WeiClinic()
export const getClinic = () => weiClinic