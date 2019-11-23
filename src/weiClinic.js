import Dal from './dal'
import CorticalStack from './corticalStack'
import Envelope from './Envelope'

class WeiClinic {
    constructor() {
    }


   async create(realGender, name, age) {
        const dal = new Dal()
        try{
        const newStack = new CorticalStack(null, realGender, name, age, null)
        const newEnvelope = new Envelope(null, realGender, age, null)

        await dal.saveStackData(newStack)
        await dal.saveEnvelopeData(newEnvelope)

        newEnvelope.idStack = newStack.id
        newStack.idEnvelope = newEnvelope.id

        await dal.saveStackData(newStack)
        await dal.saveEnvelopeData(newEnvelope)

        return {
            corticalStack: newStack,
            envelope: newEnvelope
        }
    }catch(err){
        console.error(err.message)
        throw err
    }finally{
        await connection.close()
    }}

   async assignStackToEnvelope(idStack, idEnvelope) {
        const dal = new Dal()
        const stacks = await dal.getStackData()
        const stack = await stacks.find(sta => { return sta.id == idStack })

        if (!stack) {
            throw "ad1" //400
        }

        if (!(stack.idEnvelope === null)) { throw "ad2" }

        const envelopes = await dal.getEnvelopeData()
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

        await dal.saveStackData(stack)
        await dal.saveEnvelopeData(envelope)

    }

    async removeStackFromEnvelope(idStack) {
        const dal = new Dal()
        const stacks = await dal.getStackData()
        const envelopes = await dal.getEnvelopeData()

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

        await dal.saveStackData(stack)
        await dal.saveEnvelopeData(envelope)
    }

    async killEnvelope(idEnvelope) {
        const dal = new Dal()
        const stacks = await dal.getStackData()
        const envelopes =await  dal.getEnvelopeData()

        const envelope = await envelopes.find(env => env.id == idEnvelope)
        if (!envelope) { //not found
            throw "kil"
        }

        //If envelope got a Stack we remove it first
        if (envelope.idStack) {
           stack = await stacks.find(sta => { return sta.id == envelope.idStack })
           stack.idEnvelope = null
        }
        await dal.saveStackData(stack)
        await dal.removeEnvelopeData(idEnvelope)
    }

    async destroyStack(idStack) {
        const dal = new Dal()
        const stacks =await  dal.getStackData()
     
        const stack = await stacks.find(sta => { return sta.id == idStack })
        if (!stack) {
            throw "ds"
        }
        //if stack is in a envelope the envelope is erase too
        if (stack.idEnvelope) {
            await dal.removeEnvelopeData(stack.idEnvelope)
        }

        await dal.removeStackData(idStack)
        }
}
const weiClinic = new WeiClinic()

export const getClinic = () => weiClinic