import Dal from './dal'
import CorticalStack from './corticalStack'
import Envelope from './Envelope'

class WeiClinic {
    constructor() {
        this.dal = new Dal()
    }

    async create(realGender, name, age) {
        try {
            return await this.dal.digitize(
                new Envelope(null, realGender, age, null),
                new CorticalStack(null, realGender, name, age, null))
        } catch (err) {
            console.error(err.message)
            throw err
        }
    }

    async assignStackToEnvelope(idStack, idEnvelope) {
        try {
            const stack = await this.dal.getStackById(idStack)
            //if no stack found
            if (!stack) {
                throw "ad1" //400
            }

            //stack already in an envelope
            if (!(stack.idEnvelope === null)) { throw "ad2" }

            let envelope

            if (idEnvelope) {
                envelope = await this.dal.getEnvelopeById(idEnvelope)

                //can't find envelope stack is in
                if (!envelope) { throw "ad3" } //400
                //envelope is empty
                if (!(envelope.idStack === null)) { throw "ad4" }

            } else { //default (no envelope given)
                // find first empty envelope
                const envelope = this.dal.getFirstEmptyEnvelope()
                //no empty envelope
                if (!envelope) { throw "ad5" } //404
            }

            await this.dal.moveEnvelopeToStack(envelope.id, idStack)
            await this.dal.moveStackToEnvelope(idStack, envelope.id)

        } catch (error) {
            throw error
        }

    }

    async removeStackFromEnvelope(idStack) {
        try {
            const stacks = await this.dal.getStackData()
            const envelopes = await this.dal.getEnvelopeData()

            const stack = await stacks.find(sta => { return sta.id == idStack })
            if (!stack) { //stack not found
                throw "rm1"
            }

            //stack isn't inside an envelope
            if (!stack.idEnvelope) {
                throw "rm2"
            }

            const envelope = await envelopes.find(env => { return env.id == stack.idEnvelope })
            //can't find envelope
            if (!envelope) {
                throw "rm3"
            }

            envelope.idStack = null
            stack.idEnvelope = null

            await this.dal.saveStackData(stack)
            await this.dal.saveEnvelopeData(envelope)
        } catch (error) {
            throw error
        }
    }

    async killEnvelope(idEnvelope) {
        try {
            const envelope = await this.dal.getEnvelopeById(idEnvelope)
            if (!envelope) { //not found
                throw "kil"
            }
            //If there is a stack in the envelope
            if (envelope.idStack) {
                //Removing stack from envelope
                await this.dal.moveStackToEnvelope(envelope.idStack, null)
            }
            //killing envelope
            await this.dal.removeEnvelopeData(idEnvelope)
        } catch (error) {
            throw error
        }
    }

    async destroyStack(idStack) {
        try {
            const stack = await this.dal.getStackById(idStack)
            if (!stack) {
                throw "ds"
            }

            //if stack is in a envelope the envelope is erase too
            if (stack.idEnvelope) {
                await this.dal.removeEnvelopeData(stack.idEnvelope)
            }

            await this.dal.removeStackData(idStack)
        } catch (error) {
            throw error
        }
    }
}

const weiClinic = new WeiClinic()

export const getClinic = () => weiClinic