import { getClinic } from '../../weiClinic.js'

describe('removeStackFromEnvelope test', () => {
    let weiClinic

    beforeEach(() => {
        weiClinic = getClinic()
    })

    it('Test create', async () => {
        const fakeStack = { id: 1, idEnvelope: 1 }
        const fakeEnvelope = { id: 1, idStack: 1 }

        weiClinic.dal.digitize = jest.fn()
            .mockReturnValue({
                corticalStack: fakeStack,
                envelope: fakeEnvelope
            })

        const result = await weiClinic.create("M", "Toto", 8)

        expect(weiClinic.dal.digitize).toHaveBeenCalledTimes(1)
        expect(result.corticalStack).toEqual({ id: 1, idEnvelope: 1 })
        expect(result.envelope).toEqual({ id: 1, idStack: 1 })
    });


    it('Test add second', async () => {
        const fakeStack = { id: 2, idEnvelope: 2 }
        const fakeEnvelope = { id: 2, idStack: 2 }

        weiClinic.dal.digitize = jest.fn()
            .mockReturnValue({
                corticalStack: fakeStack,
                envelope: fakeEnvelope
            })

        const result = await weiClinic.create("M", "Toto", 8)

        expect(weiClinic.dal.digitize).toHaveBeenCalledTimes(1)
        expect(result.corticalStack).toEqual({ id: 2, idEnvelope: 2 })
        expect(result.envelope).toEqual({ id: 2, idStack: 2 })
    });

})
