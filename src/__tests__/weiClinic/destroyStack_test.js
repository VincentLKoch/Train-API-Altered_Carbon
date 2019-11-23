import { getClinic } from '../../weiClinic.js'

describe('Destroy Stack test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()

    })

    it('The stack is destroyed', async () => {
        try {

            weiClinic.dal.getStackById = jest.fn()
                .mockReturnValue({ id: 1, idEnvelope: null });
            weiClinic.dal.removeStackData = jest.fn()

            await weiClinic.destroyStack(1)

            expect(weiClinic.dal.getStackById).toHaveBeenCalledWith(1)
            expect(weiClinic.dal.removeStackData).toHaveBeenCalledWith(1)

        } catch (error) {
            expect(error).toBeNull()
        }

    });

    it('The stack and the envelope are destroyed', async () => {
        try {
            weiClinic.dal.getStackById = jest.fn()
                .mockReturnValue({ id: 1, idEnvelope: 3 });
            weiClinic.dal.removeStackData = jest.fn()
            weiClinic.dal.removeEnvelopeData = jest.fn()

            await weiClinic.destroyStack(1)

            expect(weiClinic.dal.getStackById).toHaveBeenCalledWith(1)
            expect(weiClinic.dal.removeStackData).toHaveBeenCalledWith(1)
            expect(weiClinic.dal.removeEnvelopeData).toHaveBeenCalledWith(3)
        } catch (error) {
            expect(error).toBeNull()
        }
    });

    it('The stack is not found', async () => {
        try {
            weiClinic.dal.getStackById = jest.fn().mockReturnValue(null);
            await weiClinic.destroyStack(3)
            
        } catch (error) {
            expect(error).toBe("ds") //stack not found
        }
        expect(weiClinic.dal.getStackById).toHaveBeenCalledTimes(1)
    });

})