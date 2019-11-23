import { getClinic } from '../../weiClinic.js'
import Dal from '../../dal'
import CorticalStack from '../../corticalStack'
import Envelope from '../../Envelope'

describe('removeStackFromEnvelope test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()
    })

    it('Test create', () => {

        const fakeStack = new CorticalStack(1, "M", "Toto", 8,1)
        const fakeEnvelope = new Envelope(1, 'M', 8,1)
        Dal.saveStackData  = jest.fn().mockReturnValue(fakeStack);
        Dal.saveEnvelopeData  = jest.fn().mockReturnValue(fakeEnvelope);

        const created =  weiClinic.create("M", "Toto", 8)

        expect(Dal.saveEnvelopeData).toHaveBeenCalledTimes(2)
        expect(Dal.saveStackData).toHaveBeenCalledTimes(2)
        expect(created.envelope).toEqual([{ id: 1, gender: 'M', age: 8, idStack: 1 }])
        expect(created.corticalStack).toEqual([{ id: 1, name: 'Toto', age: 8, idEnvelope: 1, realGender: 'M' }])
    });

    it('Test add second', () => {
        

        const fakeStack = new CorticalStack(2, "M", "Toto", 8,2)
        const fakeEnvelope = new Envelope(2, 'M', 8,2)
        Dal.saveStackData  = jest.fn().mockReturnValue(fakeStack);
        Dal.saveEnvelopeData  = jest.fn().mockReturnValue(fakeEnvelope);

        const created =  weiClinic.create("M", "Toto", 8)

        expect(Dal.saveEnvelopeData).toHaveBeenCalledTimes(2)
        expect(Dal.saveStackData).toHaveBeenCalledTimes(2)
        expect(created.envelope).toEqual([{ id: 2, gender: 'M', age: 8, idStack: 2 }])
        expect(created.corticalStack).toEqual([{ id: 2, name: 'Toto', age: 8, idEnvelope: 2, realGender: 'M' }])
    });

})
