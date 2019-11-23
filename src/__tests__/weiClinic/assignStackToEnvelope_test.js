import { getClinic } from '../../weiClinic.js'
import Dal from '../../dal.js'
import CorticalStack from '../../corticalStack'
import Envelope from '../../Envelope'



describe('assignStackToEnvelope test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()

    })

    it('Test Working', async () => {
        weiClinic.dal.getStackById = jest.fn()
            .mockReturnValue({ id: 1, idEnvelope: null });
        weiClinic.dal.moveStackToEnvelope = jest.fn()
        weiClinic.dal.moveEnvelopeToStack = jest.fn()
        weiClinic.dal.getFirstEmptyEnvelope = jest.fn()
            .mockReturnValue({ id: 2, idStack: null });

        await weiClinic.assignStackToEnvelope(1)
       
        expect(weiClinic.dal.getEnvelopeById).toHaveBeenCalledWith(1)
        expect(weiClinic.dal.moveStackToEnvelope).toHaveBeenCalledWith(1, 2)
        expect(weiClinic.dal.moveEnvelopeToStack).toHaveBeenCalledWith(2,1)
        expect(weiClinic.dal.getFirstEmptyEnvelope).toBeCalledTimes(1)
    });

    it('Stack not found', async () => {
        weiClinic.dal.getStackById = jest.fn()
        .mockReturnValue(null);

        expect(() => { await weiClinic.assignStackToEnvelope(1) }).toThrow("ad1")
        expect(weiClinic.dal.getStackById).toHaveBeenCalledWith(1)
    });

    it('Stack already inside a envelope', async () => {
        weiClinic.dal.getStackById = jest.fn()
        .mockReturnValue({ id: 1, idEnvelope: 1 });

        expect(() => { await weiClinic.assignStackToEnvelope(1) }).toThrow("ad2")
        expect(weiClinic.dal.getStackById).toHaveBeenCalledWith(1)
    });

    it("Can't find given envelope", async () => {
        weiClinic.dal.getStackById = jest.fn()
        .mockReturnValue({ id: 1, idEnvelope: null });
        weiClinic.dal.getEnvelopeById = jest.fn()
        .mockReturnValue(null);

        expect(() => { await weiClinic.assignStackToEnvelope(1, 1) }).toThrow("ad3")
        expect(weiClinic.dal.getStackById).toHaveBeenCalledWith(1)
        expect(weiClinic.dal.getEnvelopeById).toHaveBeenCalledWith(1)
    });

    it('Given envelope is used', async () => {
        weiClinic.dal.getStackById = jest.fn()
        .mockReturnValue({ id: 1, idEnvelope: null });
        weiClinic.dal.getEnvelopeById = jest.fn()
        .mockReturnValue({ id: 1, idStack: 2 });

        expect(() => { await weiClinic.assignStackToEnvelope(1, 1) }).toThrow("ad4")
        expect(weiClinic.dal.getStackById).toHaveBeenCalledWith(1)
        expect(weiClinic.dal.getEnvelopeById).toHaveBeenCalledWith(1)
    });

    it('No envelope empty1', async () => {
        weiClinic.dal.getStackById = jest.fn()
        .mockReturnValue({ id: 1, idEnvelope: null });
        weiClinic.dal.getFirstEmptyEnvelope = jest.fn()
        .mockReturnValue(null);

        expect(() => { await weiClinic.assignStackToEnvelope(1) }).toThrow("ad5")
        expect(weiClinic.dal.getStackById).toHaveBeenCalledWith(1)
        expect(weiClinic.dal.getFirstEmptyEnvelope).toHaveBeenCalledTimes(1)
    });
})
