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
    }

    removeStackFromEnvelope(idStack) {
        const stack = this.stacks.find(sta => { return sta.id == idStack })
        if (!stack) {
            throw "rm1"
        }

        const envelope = this.envelopes.find(env => { return env.id == stack.idEnvelope })
        if (!envelope) {
            throw "rm2"
        }

        envelope.idStack = null
        stack.idEnvelope = null
    }

    killEnvelope(idEnvelope) {
        const envelope = this.envelopes.find(env => env.id == idEnvelope)
        if (!envelope) {
            throw "kil"
        }

        //If envelope got a Stack we remove it first
        if (envelope.idStack) {
            this.stacks.find(sta => { return sta.id == envelope.idStack }).idEnvelope = null
        }
        this.envelopes = this.envelopes.filter(env => { return !(env.id == idEnvelope) })
    }

    destroyStack(idStack) {
        const stack = this.stacks.find(sta => { return sta.id == idStack })
        if (!stack) {
            throw "ds"
        }
        //if stack is in a envelope the envelope is erase too
        if (stack.idEnvelope) {
            this.envelopes = this.envelopes.filter(env => { return !(env.id === stack.idEnvelope) })
        }
        this.stacks = this.stacks.filter(sta => { return !(sta.id == idStack) })
    }
}
const weiClinic = new WeiClinic()
export const getClinic = () => weiClinic