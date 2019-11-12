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
        const envelope = this.envelopes[idEnvelope] || this.envelopes.find(obj => {return obj.idStack === null})

        if (envelope != undefined){
            envelope.idStack = stack.id
            stack.idEnvelope = envelope.id
            return true
        }
        
       else{ return false}

    }

    removeStackFromEnvelope(idStack, idEnvelope) {
        const stack = this.stacks[idStack]
        const envelope = this.envelopes[idEnvelope] || this.envelopes[stack.idEnvelope]

        if (envelope != undefined){
            envelope.idStack = null
            stack.idEnvelope = null
            return true
        }
        
       else{ return false}

    }

    killEnvelope(idEnvelope) {
        const envelope = this.envelopes[idEnvelope]
        if (envelope != undefined){

            if (envelope.idStack != null) { 
                const stack = this.stacks[envelope.idStack]
                stack.idEnvelope = null;
            }
            
            this.envelopes.splice(idEnvelope,1)
            return true
         }

        else{ return false}
    }

    destroyStack(idStack) {
        const stack = this.stacks[idStack]
        if (stack != undefined){

            if (stack.idEnvelope != null) { 
                const envelope = this.envelopes[stack.idEnvelope]
                envelope.idStack = null;
            }
            
            this.stacks.splice(idStack,1)
            return true
         }

        else{ return false}
    }
}

const weiClinic = new WeiClinic()

export const getClinic = () => weiClinic
