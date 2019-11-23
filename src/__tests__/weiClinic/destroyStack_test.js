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

    it('The stack is destroyed', async () => {
        weiClinic.dal.getStackById = jest.fn()
            .mockReturnValue({ id: 1, idEnvelope: null });
        weiClinic.dal.removeStackData = jest.fn()

        await weiClinic.destroyStack(1)

        expect(weiClinic.dal.getStackById).toHaveBeenCalledWith(1)
        expect(weiClinic.dal.removeStackData).toHaveBeenCalledWith(1)

    });

    it('The stack and the envelope are destroyed',async () => {
        weiClinic.dal.getStackById = jest.fn()
            .mockReturnValue({ id: 1, idEnvelope: 3 });
        weiClinic.dal.removeStackData = jest.fn()
        weiClinic.dal.removeEnvelopeData = jest.fn()

        await weiClinic.destroyStack(1)

        expect(weiClinic.dal.getStackById).toHaveBeenCalledWith(1)
        expect(weiClinic.dal.removeStackData).toHaveBeenCalledWith(1)
        expect(weiClinic.dal.removeEnvelopeData).toHaveBeenCalledWith(3)
    });

    it('The stack is not found', async () => {
        weiClinic.dal.getStackById = jest.fn()
        .mockReturnValue(null);

        expect(() => { await weiClinic.destroyStack(3) }).toThrow("ds")
        expect(weiClinic.dal.getStackById).toHaveBeenCalledTimes(1)
    });

})