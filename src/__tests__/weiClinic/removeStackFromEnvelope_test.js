import { getClinic } from '../../weiClinic.js'
import Dal from '../../dal.js'
import CorticalStack from '../../corticalStack'
import Envelope from '../../Envelope'

describe('removeStackFromEnvelope test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()

    })

    it('Test Working', () => {
        const fakeStackMethods = {find(){return new CorticalStack(1, "M", "Toto", 8,1)}}
        Dal.getStackData  = jest.fn().mockReturnValue(fakeStackMethods);
        Dal.getEnvelopeData  = jest.fn()

        Dal.saveStackData = jest.fn()
        Dal.saveEnvelopeData = jest.fn()

        weiClinic.removeStackFromEnvelope(1)

        expect(Dal.getEnvelopeData).toHaveBeenCalledTimes(1)
        expect(Dal.saveEnvelopeData).toHaveBeenCalledTimes(1)
        expect(Dal.getStackData).toHaveBeenCalledTimes(1)
        expect(Dal.saveStackData).toHaveBeenCalledTimes(1)
    });
    
    it('Stack not found', () => {
        const fakeStackMethods = {find(){return null}}
        Dal.getStackData  = jest.fn().mockReturnValue(fakeStackMethods);

        const fakeEnvelopeMethods = {find(){return new Envelope(1, "M", 8,1)}}
        Dal.getEnvelopeData  = jest.fn().mockReturnValue(fakeEnvelopeMethods);


        expect(() => { weiClinic.removeStackFromEnvelope(1) }).toThrow("rm1")
        expect(Dal.getStackData).toHaveBeenCalledTimes(1)
        expect(Dal.getEnvelopeData).toHaveBeenCalledTimes(1)
    });

    it("Stack don't have envelope", () => {
        const fakeStackMethods = {find(){return new CorticalStack(1, "M", "Toto", 8,null)}}
        Dal.getStackData  = jest.fn().mockReturnValue(fakeStackMethods);
        Dal.getEnvelopeData  = jest.fn();

        expect(() => { weiClinic.removeStackFromEnvelope(1) }).toThrow("rm2")
        expect(Dal.getStackData).toHaveBeenCalledTimes(1)
        expect(Dal.getEnvelopeData).toHaveBeenCalledTimes(1)
    });

    it("Can't find stack's envelope", () => {
        const fakeStackMethods = {find(){return new CorticalStack(1, "M", "Toto", 8,1)}}
        Dal.getStackData  = jest.fn().mockReturnValue(fakeStackMethods);
        const fakeEnvelopeMethods = {find(){return null}}
        Dal.getEnvelopeData  = jest.fn().mockReturnValue(fakeEnvelopeMethods);




        expect(() => { weiClinic.removeStackFromEnvelope(1) }).toThrow("rm3")
        expect(Dal.getStackData).toHaveBeenCalledTimes(1)
        expect(Dal.getEnvelopeData).toHaveBeenCalledTimes(1)
    });
})
