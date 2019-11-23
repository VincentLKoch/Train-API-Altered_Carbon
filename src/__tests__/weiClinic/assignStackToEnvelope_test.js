import { getClinic } from '../../weiClinic.js'
import Dal from '../../dal.js'
import CorticalStack from '../../corticalStack'
import Envelope from '../../Envelope'



describe('assignStackToEnvelope test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()

    })

    it('Test Working', () => {
        const fakeStackMethods = {find(){return new CorticalStack(1, "M", "Toto", 8,null)}}
        Dal.getStackData  = jest.fn().mockReturnValue(fakeStackMethods);

        const fakeEnvelopeMethods = {findOne(){return new Envelope(1, "M", 8,null)}}
        Dal.getEnvelopeData  = jest.fn().mockReturnValue(fakeEnvelopeMethods);

        Dal.saveStackData = jest.fn()
        Dal.saveEnvelopeData = jest.fn()

        weiClinic.assignStackToEnvelope(1)

        expect(Dal.getEnvelopeData).toHaveBeenCalledTimes(1)
        expect(Dal.saveEnvelopeData).toHaveBeenCalledTimes(1)
        expect(Dal.getStackData).toHaveBeenCalledTimes(1)
        expect(Dal.saveStackData).toHaveBeenCalledTimes(1)

    });

    it('Stack not found', () => {
        const fakeStackMethods = {find(){return null}}
        Dal.getStackData  = jest.fn().mockReturnValue(fakeStackMethods);

        expect(() => { weiClinic.assignStackToEnvelope(1) }).toThrow("ad1")
        expect(Dal.getStackData).toHaveBeenCalledTimes(1)
    });

    it('Stack already inside a envelope', () => {
        const fakeStackMethods = {find(){return new CorticalStack(1, "M", "Toto", 8,1)}}
        Dal.getStackData  = jest.fn().mockReturnValue(fakeStackMethods);

        expect(() => { weiClinic.assignStackToEnvelope(1) }).toThrow("ad2")
        expect(Dal.getStackData).toHaveBeenCalledTimes(1)
    });

    it("Can't find given envelope", () => {
        const fakeStackMethods = {find(){return new CorticalStack(1, "M", "Toto", 8,null)}}
        Dal.getStackData  = jest.fn().mockReturnValue(fakeStackMethods);

        const fakeEnvelopeMethods = {find(){return null}}
        Dal.getEnvelopeData  = jest.fn().mockReturnValue(fakeEnvelopeMethods);

        expect(() => { weiClinic.assignStackToEnvelope(1, 1) }).toThrow("ad3")
        expect(Dal.getStackData).toHaveBeenCalledTimes(1)
        expect(Dal.getEnvelopeData).toHaveBeenCalledTimes(1)
    });

    it('Given envelope is used', () => {
        const fakeStackMethods = {find(){return new CorticalStack(1, "M", "Toto", 8,null)}}
        Dal.getStackData  = jest.fn().mockReturnValue(fakeStackMethods);

        const fakeEnvelopeMethods = {find(){return new Envelope(1, "M", 8,2) }}
        Dal.getEnvelopeData  = jest.fn().mockReturnValue(fakeEnvelopeMethods);

        expect(() => { weiClinic.assignStackToEnvelope(1, 1) }).toThrow("ad4")
        expect(Dal.getStackData).toHaveBeenCalledTimes(1)
        expect(Dal.getEnvelopeData).toHaveBeenCalledTimes(1)
    });

    it('No envelope empty1', () => {
        const fakeStackMethods = {findOne(){return new CorticalStack(1, "M", "Toto", 8,null)}}
        Dal.getStackData  = jest.fn().mockReturnValue(fakeStackMethods);

        const fakeEnvelopeMethods = {find(){return null }}
        Dal.getEnvelopeData  = jest.fn().mockReturnValue(fakeEnvelopeMethods);

        expect(() => { weiClinic.assignStackToEnvelope(1) }).toThrow("ad5")
        expect(Dal.getStackData).toHaveBeenCalledTimes(1)
        expect(Dal.getEnvelopeData).toHaveBeenCalledTimes(1)
    });
})
