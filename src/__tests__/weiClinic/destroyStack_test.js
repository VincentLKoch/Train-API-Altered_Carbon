import { getClinic } from '../../weiClinic.js'
import CorticalStack from '../../corticalStack.js'
import Dal from '../../dal.js'
import CorticalStack from '../../corticalStack'
import Envelope from '../../Envelope'


describe('Destroy Stack test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()

    })

    it('The stack is destroyed', () => {
        const fakeStackMethods = {find(){return new CorticalStack(1,"M", "Toto", 8, null)}}
        Dal.getStackData  = jest.fn().mockReturnValue(fakeStackMethods);

        Dal.removeStackData  = jest.fn()

        weiClinic.destroyStack(1)

        expect(Dal.getStackData).toHaveBeenCalledTimes(1)
        expect(Dal.removeStackData).toHaveBeenCalledTimes(1)

    });

    it('The stack and the envelope are destroyed', () => {
        const fakeStackMethods = {find(){return new CorticalStack(1,"M", "Toto", 8, 1)}}
        Dal.getStackData  = jest.fn().mockReturnValue(fakeStackMethods);

        Dal.removeStackData  = jest.fn()
        Dal.removeEnvelopeData = jest.fn()

        weiClinic.destroyStack(1)

        expect(Dal.getStackData).toHaveBeenCalledTimes(1)
        expect(Dal.removeStackData).toHaveBeenCalledTimes(1)
        expect(Dal.removeEnvelopeData).toHaveBeenCalledTimes(1)
        
    });

    it('The stack is not found', () => {
        const fakeStackMethods = {find(){return null}}
        Dal.getStackData  = jest.fn().mockReturnValue(fakeStackMethods);

        expect(() => { weiClinic.destroyStack(3) }).toThrow("ds")
        expect(Dal.getStackData).toHaveBeenCalledTimes(1)
    });

})