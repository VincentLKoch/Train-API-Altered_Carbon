import { getClinic } from '../../weiClinic.js'

describe('Kill test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()

    })

    it('The enveloppe is killed', async () => {
        weiClinic.dal.getEnvelopeData = jest.fn()
            .mockReturnValue([{ id: 1, idStack: null }]);
        weiClinic.dal.moveStackToEnvelope = jest.fn()
        weiClinic.dal.removeEnvelopeData = jest.fn()

        await weiClinic.killEnvelope(1)

        expect(weiClinic.dal.getEnvelopeData).toHaveBeenCalled()
        expect(weiClinic.dal.moveStackToEnvelope).toHaveBeenCalledWith(null, null)
        expect(weiClinic.dal.removeEnvelopeData).toHaveBeenCalledWith(1)


    });
    /*
        it('The enveloppe is killed and we keep the stack', async () => {
            const fakeEnvelopeMethods = { find() { return new Envelope(1, "M", 8, 1) } }
            weiClinic.dal.getEnvelopeData = jest.fn().mockReturnValue(fakeEnvelopeMethods);
    
            const fakeStackMethods = { find() { return new CorticalStack(1, "M", "Toto", 8, 1) } }
            weiClinic.dal.getStackData = jest.fn().mockReturnValue(fakeStackMethods);
    
            weiClinic.dal.saveStackData = jest.fn()
            weiClinic.dal.removeEnvelopeData = jest.fn()
    
            await weiClinic.killEnvelope(1)
    
            expect(weiClinic.dal.getStackData).toHaveBeenCalledTimes(1)
            expect(weiClinic.dal.getEnvelopeData).toHaveBeenCalledTimes(1)
            expect(weiClinic.dal.saveStackData).toHaveBeenCalledTimes(1)
            expect(weiClinic.dal.removeEnvelopeData).toHaveBeenCalledTimes(1)
    
    
        });
    
        it('The enveloppe is not finded', async () => {
            const fakeEnvelopeMethods = { find() { return null } }
            weiClinic.dal.getEnvelopeData = jest.fn().mockReturnValue(fakeEnvelopeMethods);
            weiClinic.dal.getStackData = jest.fn()
    
            expect(() => { await weiClinic.killEnvelope(3) }).toThrow("kil")
        });
    */

})