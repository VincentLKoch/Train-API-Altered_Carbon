import { getClinic } from '../../weiClinic.js'
import CorticalStack from '../../corticalStack.js'
import Dal from '../../dal.js'
import CorticalStack from '../../corticalStack'
import Envelope from '../../Envelope'

describe('Kill test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()

    })

    it('The enveloppe is killed', () => {
        const fakeEnvelopeMethods = {find(){return new Envelope(1,"M", 8, null)}}
        Dal.getEnvelopeData  = jest.fn().mockReturnValue(fakeEnvelopeMethods);
        Dal.getStackData = jest.fn()

        Dal.saveStackData = jest.fn()
        Dal.removeEnvelopeData = jest.fn()

        weiClinic.killEnvelope(1)

        expect(Dal.getStackData).toHaveBeenCalledTimes(1)
        expect(Dal.getEnvelopeData).toHaveBeenCalledTimes(1)
        expect(Dal.saveStackData).toHaveBeenCalledTimes(1)
        expect(Dal.removeEnvelopeData).toHaveBeenCalledTimes(1)
        
    });

    it('The enveloppe is killed and we keep the stack', () => {
        const fakeEnvelopeMethods = {find(){return new Envelope(1,"M", 8, 1)}}
        Dal.getEnvelopeData  = jest.fn().mockReturnValue(fakeEnvelopeMethods);
        
        const fakeStackMethods = {find(){return new CorticalStack(1,"M", "Toto", 8, 1)}}
        Dal.getStackData = jest.fn().mockReturnValue(fakeStackMethods);

        Dal.saveStackData = jest.fn()
        Dal.removeEnvelopeData = jest.fn()

        weiClinic.killEnvelope(1)

        expect(Dal.getStackData).toHaveBeenCalledTimes(1)
        expect(Dal.getEnvelopeData).toHaveBeenCalledTimes(1)
        expect(Dal.saveStackData).toHaveBeenCalledTimes(1)
        expect(Dal.removeEnvelopeData).toHaveBeenCalledTimes(1)

        
    });

    it('The enveloppe is not finded', () => {
        const fakeEnvelopeMethods = {find(){return null}}
        Dal.getEnvelopeData  = jest.fn().mockReturnValue(fakeEnvelopeMethods);
        Dal.getStackData = jest.fn()

        expect(() => { weiClinic.killEnvelope(3) }).toThrow("kil")
    });


})