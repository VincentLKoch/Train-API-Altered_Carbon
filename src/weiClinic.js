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
        const stacks = await this.dal.getStackData()
        const stack = await stacks.find(sta => { return sta.id == idStack })

        if (!stack) {
            throw "ad1" //400
        }

        if (!(stack.idEnvelope === null)) { throw "ad2" }

        const envelopes = await this.dal.getEnvelopeData()
        let envelope

        if (idEnvelope) {
            envelope = await envelopes.find(env => { return env.id == idEnvelope })
            if (!envelope) { throw "ad3" } //400
            if (!(envelope.idStack === null)) { throw "ad4" } //envelope already have a stack, error 400

        } else {
            envelope = await envelopes.findOne(env => { return env.idStack === null })
            if (!envelope) { throw "ad5" } //404
        }

        envelope.idStack = stack.id
        stack.idEnvelope = envelope.id

        await this.dal.saveStackData(stack)
        await this.dal.saveEnvelopeData(envelope)

    }

    async removeStackFromEnvelope(idStack) {

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
    }

    async killEnvelope(idEnvelope) {
        try {
            const envelope = await this.dal.getEnvelopeById(idEnvelope)
            if (!envelope) { //not found
                throw "kil"
            }
            await this.dal.moveStackToEnvelope(envelope.idStack, null)
            await this.dal.removeEnvelopeData(idEnvelope)
        } catch (error) {
            throw error
        }
    }

    async destroyStack(idStack) {

        const stacks = await this.dal.getStackData()

        const stack = await stacks.find(sta => { return sta.id == idStack })
        if (!stack) {
            throw "ds"
        }
        //if stack is in a envelope the envelope is erase too
        if (stack.idEnvelope) {
            await this.dal.removeEnvelopeData(stack.idEnvelope)
        }

        await this.dal.removeStackData(idStack)
    }
}
const weiClinic = new WeiClinic()

export const getClinic = () => weiClinic