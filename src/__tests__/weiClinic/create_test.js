import { getClinic } from '../../weiClinic.js'
import CorticalStack from '../../corticalStack'
import Envelope from '../../Envelope'

describe('removeStackFromEnvelope test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()
    })

    it('Test create', async () => {
        const fakeStack = new CorticalStack(1, "M", "Toto", 8, 1)
        const fakeEnvelope = new Envelope(1, 'M', 8, 1)

        weiClinic.dal.digitize = jest.fn()
            .mockReturnValue({
                corticalStack: fakeStack,
                envelope: fakeEnvelope
            })

        const result = await weiClinic.create("M", "Toto", 8)

        expect(weiClinic.dal.digitize).toHaveBeenCalledTimes(1)
        expect(result.corticalStack).toEqual({ id: 1, name: 'Toto', age: 8, idEnvelope: 1, realGender: 'M' })
        expect(result.envelope).toEqual({ id: 1, gender: 'M', age: 8, idStack: 1 })
    });


    it('Test add second',async () => {
        const fakeStack = new CorticalStack(2, "M", "Toto", 8, 2)
        const fakeEnvelope = new Envelope(2, 'M', 8, 2)

        weiClinic.dal.digitize = jest.fn()
            .mockReturnValue({
                corticalStack: fakeStack,
                envelope: fakeEnvelope
            })

        const result = await weiClinic.create("M", "Toto", 8)

        expect(weiClinic.dal.digitize).toHaveBeenCalledTimes(1)
        expect(result.envelope).toEqual({ id: 2, gender: 'M', age: 8, idStack: 2 })
        expect(result.corticalStack).toEqual({ id: 2, name: 'Toto', age: 8, idEnvelope: 2, realGender: 'M' })
    });

})
