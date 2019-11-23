import { getClinic } from '../../weiClinic.js'
import Dal from '../../dal.js'
import CorticalStack from '../../corticalStack'
import Envelope from '../../Envelope'

describe('removeStackFromEnvelope test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()

    })

    it('Test Working', async () => {
        weiClinic.dal.getStackById = jest.fn()
        .mockReturnValue({ id: 1, idEnvelope: 1 });
        weiClinic.dal.moveStackToEnvelope = jest.fn()
        weiClinic.dal.moveEnvelopeToStack = jest.fn()
        weiClinic.dal.getEnvelopeById = jest.fn()
        .mockReturnValue({ id: 1, idStack: 1 });

        await weiClinic.removeStackFromEnvelope(1)

        expect(weiClinic.dal.getStackById).toHaveBeenCalledWith(1)
        expect(weiClinic.dal.getEnvelopeById).toHaveBeenCalledWith(1)
        expect(weiClinic.dal.moveStackToEnvelope).toHaveBeenCalledWith(1, 1)
        expect(weiClinic.dal.moveEnvelopeToStack).toHaveBeenCalledWith(1,1)
    });
    
    it('Stack not found', async () => {
        weiClinic.dal.getStackById = jest.fn()
        .mockReturnValue(null);

        expect(() => { await weiClinic.removeStackFromEnvelope(1) }).toThrow("rm1")
        expect(weiClinic.dal.getStackById).toHaveBeenCalledWith(1)
    });

    it("Stack don't have envelope", async() => {
        weiClinic.dal.getStackById = jest.fn()
        .mockReturnValue({ id: 1, idEnvelope: null });

        expect(() => { await eiClinic.removeStackFromEnvelope(1) }).toThrow("rm2")
        expect(weiClinic.dal.getStackById).toHaveBeenCalledWith(1)
    });

    it("Can't find stack's envelope", async() => {
        weiClinic.dal.getStackById = jest.fn()
        .mockReturnValue({ id: 1, idEnvelope: 1 });
        weiClinic.dal.moveStackToEnvelope = jest.fn()
        weiClinic.dal.moveEnvelopeToStack = jest.fn()
        weiClinic.dal.getEnvelopeById = jest.fn()
        .mockReturnValue(null);

        expect(() => { await weiClinic.removeStackFromEnvelope(1) }).toThrow("rm3")
        expect(weiClinic.dal.getStackById).toHaveBeenCalledWith(1)
        expect(weiClinic.dal.getEnvelopeById).toHaveBeenCalledWith(1)
    });
})
