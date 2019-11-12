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
        const stack = this.stacks.find(stack => { return stack.id == idStack })

        if (!stack) {
            throw "ad1" //400
        }

        if (idEnvelope) {
            const envelope = this.envelopes.find(envelope => { return envelope.id == idEnvelope })
            if (!envelope) { throw "ad2" } //400
            if (!envelope.idStack) { throw "ad3" } //400

        } else {
            const envelope = this.envelopes.find(obj => { return obj.idStack === null })
            if (!envelope) { throw "ad4" } //404
        }

        envelope.idStack = stack.id
        stack.idEnvelope = envelope.id
    }

    removeStackFromEnvelope(idStack) {
        const stack = this.stacks.find(stack => { return stack.id == idStack })
        if (!stack) {
            throw "rm1"
        }

        const envelope = this.envelopes.find(envelope => { return envelope.id == stack.idEnvelope })
        if (!envelope) {
            throw "rm2"
        }

        envelope.idStack = null
        stack.idEnvelope = null
    }

    killEnvelope(idEnvelope) {
        const envelope = this.envelopes.find(obj => obj.id == idEnvelope)
        if (!envelope) {
            throw "kil"
        }

        //If envelope got a Stack we remove it first
        if (envelope.idStack) {
            this.stacks.find(stack => { return stack.id == envelope.idStack }).idEnvelope = null
        }
        this.envelopes.splice(idEnvelope - 1, 1)
    }

    destroyStack(idStack) {
        const stack = this.stacks.find(stack => { return stack.id == idStack })
        if (!stack || !stack.idEnvelope) {
            throw "ds"
        }
        if (stack.idEnvelope) {
            const envelope = this.envelopes.find(envelope => { return envelope.id == stack.idEnvelope })
            envelope.idStack = null;
        }

        this.stacks.splice(idStack, 1)
    }
}
const weiClinic = new WeiClinic()
export const getClinic = () => weiClinic