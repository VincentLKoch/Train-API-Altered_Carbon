import { getClinic } from '../../weiClinic.js'

describe('Kill test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()

    })

    it('The enveloppe is killed', async () => {
        try {
            weiClinic.dal.getEnvelopeById = jest.fn()
                .mockReturnValue({ id: 1, idStack: null });
            weiClinic.dal.moveStackToEnvelope = jest.fn()
            weiClinic.dal.removeEnvelopeData = jest.fn()

            await weiClinic.killEnvelope(1)

            expect(weiClinic.dal.getEnvelopeById).toHaveBeenCalledWith(1)
            expect(weiClinic.dal.moveStackToEnvelope).toHaveBeenCalledTimes(0) //0 since idStack = null
            expect(weiClinic.dal.removeEnvelopeData).toHaveBeenCalledWith(1)
        } catch (error) {
            expect(error).toBeNull()
        }

    });


    it('The enveloppe is killed and we keep the stack', async () => {
        try {
            weiClinic.dal.getEnvelopeById = jest.fn()
                .mockReturnValue({ id: 1, idStack: 1 });
            weiClinic.dal.moveStackToEnvelope = jest.fn()
            weiClinic.dal.removeEnvelopeData = jest.fn()


            await weiClinic.killEnvelope(1)

            expect(weiClinic.dal.getEnvelopeById).toHaveBeenCalledWith(1)
            expect(weiClinic.dal.moveStackToEnvelope).toHaveBeenCalledWith(1, null) // called with stackId, null (removing stack)
            expect(weiClinic.dal.removeEnvelopeData).toHaveBeenCalledWith(1)

        } catch (error) {
            expect(error).toBeNull()
        }
    });

    it('The enveloppe is not finded', async () => {
        try {
            weiClinic.dal.getEnvelopeById = jest.fn().mockReturnValue(null);
            weiClinic.killEnvelope(3)
        } catch (error) {
            //expect the catching of envelope not found
            expect(error).toBeNull("kil")
        }
    });

})