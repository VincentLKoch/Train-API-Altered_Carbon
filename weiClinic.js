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
        const envelope = this.envelopes[idEnvelope] || this.envelopes.find(obj => { return obj.idStack === null })

        if (!envelope) {
            throw 1
        }
        envelope.idStack = stack.id
        stack.idEnvelope = envelope.id
    }

    removeStackFromEnvelope(idStack, idEnvelope) {
        const stack = this.stacks[idStack]
        const envelope = this.envelopes[idEnvelope] || this.envelopes[stack.idEnvelope]

        if (!envelope) {
            throw 2
        }
        envelope.idStack = null
        stack.idEnvelope = null
    }

    killEnvelope(idEnvelope) {
        const envelope = this.envelopes[idEnvelope]
        if (!envelope || !envelope.idStack) {
            throw 3
        }

        const stack = this.stacks[envelope.idStack]
        stack.idEnvelope = null;
        this.envelopes.splice(idEnvelope, 1)

    }

    destroyStack(idStack) {
        const stack = this.stacks[idStack]
        if (!stack || !stack.idEnvelope) {
            throw 4
        }

        const envelope = this.envelopes[stack.idEnvelope]
        envelope.idStack = null;
        this.stacks.splice(idStack, 1)
    }
}

const weiClinic = new WeiClinic()

export const getClinic = () => weiClinic
