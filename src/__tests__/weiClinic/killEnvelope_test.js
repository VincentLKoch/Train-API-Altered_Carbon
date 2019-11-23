import { getClinic } from '../../weiClinic.js'

describe('Kill test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()

    })

    it('The enveloppe is killed', async () => {
        weiClinic.dal.getEnvelopeById = jest.fn()
            .mockReturnValue({ id: 1, idStack: null });
        weiClinic.dal.moveStackToEnvelope = jest.fn()
        weiClinic.dal.removeEnvelopeData = jest.fn()

        await weiClinic.killEnvelope(1)

        expect(weiClinic.dal.getEnvelopeById).toHaveBeenCalledWith(1)
        expect(weiClinic.dal.moveStackToEnvelope).toHaveBeenCalledWith(null, null)
        expect(weiClinic.dal.removeEnvelopeData).toHaveBeenCalledWith(1)


    });


        it('The enveloppe is killed and we keep the stack', async () => {
            weiClinic.dal.getEnvelopeById = jest.fn()
            .mockReturnValue({ id: 1, idStack: 1 });
            weiClinic.dal.moveStackToEnvelope = jest.fn()
            weiClinic.dal.removeEnvelopeData = jest.fn()
            
    
            await weiClinic.killEnvelope(1)
    
            expect(weiClinic.dal.getEnvelopeById).toHaveBeenCalledWith(1)
            expect(weiClinic.dal.moveStackToEnvelope).toHaveBeenCalledWith(1, null)
            expect(weiClinic.dal.removeEnvelopeData).toHaveBeenCalledWith(1)
    
    
        });
    
        it('The enveloppe is not finded', async () => {
            weiClinic.dal.getEnvelopeById = jest.fn()
            .mockReturnValue(null);
    
            expect(() => { await weiClinic.killEnvelope(3) }).toThrow("kil")
        });


})