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
        }
        
       else{ throw "enveleop is not availible"}

    }

    removeStackFromEnvelope(idStack, idEnvelope) {
        const stack = this.stacks[idStack]
        const envelope = this.envelopes[idEnvelope] || this.envelopes[stack.idEnvelope]

<<<<<<< HEAD
        if (envelope != undefined){
            envelope.idStack = null
            stack.idEnvelope = null
        }
        
       else{ throw "stack isn't in envelope"}

=======
        if (!envelope) {
            throw 2
        }
        envelope.idStack = null
        stack.idEnvelope = null
>>>>>>> parent of a3a0a55... catch throw stack unknow in removeStackFromEnvelope
    }

    killEnvelope(idEnvelope) {
        const envelope = this.envelopes[idEnvelope]
        if (envelope != undefined){

            if (envelope.idStack != null) { 
                const stack = this.stacks[envelope.idStack]
                stack.idEnvelope = null;
            }
            
            this.envelopes.splice(idEnvelope,1)
         }

        else{ throw "envelope does not exist"}
    }

    destroyStack(idStack) {
        const stack = this.stacks[idStack]
        if (stack != undefined){

            if (stack.idEnvelope != null) { 
                const envelope = this.envelopes[stack.idEnvelope]
                envelope.idStack = null;
            }
            
            this.stacks.splice(idStack,1)
         }

        else{ throw "stack does not exist"}
    }
}

const weiClinic = new WeiClinic()

export const getClinic = () => weiClinic
