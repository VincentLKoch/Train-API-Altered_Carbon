import Dal from '../dal'

describe('DAL test', () => {
    let dal

    beforeEach(() => {
        dal = new Dal()
    })

    it('Test Connection', async () => {
        try {
            let connection
            connection = await dal.connect()
            connection.close()
        } catch (error) {
            expect(error).toBeNull()
        }
    });

    it('Test If getStackData throw', async () => {
        try {
            await dal.getStackData()
        } catch (error) {
            expect(error).toBeNull()
        }
    });

    it('Test If getEnvelopeData throw', async () => {
        try {
            await dal.getEnvelopeData()
        } catch (error) {
            expect(error).toBeNull()
        }
    });

    it('Test in DB', async () => {
        let stack = { id: null, realGender: 'M', name: 'Toto', age: '23', idEnvelope: null }
        let envelope = { id: null, gender: 'M', age: '23', idStack: null }
        let stacks
        let envelopes

        //Test getting data
        try {
            stacks = await dal.getStackData()
            envelopes = await dal.getEnvelopeData()
        } catch (error) {
            expect(error).toBeNull()
        }

        //Test Adding
        try {
            stack, envelope = await dal.digitize(stack, envelope)
        } catch (error) {
            expect(error).toBeNull()
        }

        //Test Changing pointer
        try {
            //Changing
            await dal.moveStackToEnvelope(stack.id, 2005)
            await dal.moveEnvelopeToStack(envelope.id, 2500)
            //Testing
            const tempStacks = await dal.getStackData()
            expect(tempStacks[tempStacks.length - 1].idEnvelope).toBe(2005)
            const tempEnvelopes = await dal.getEnvelopeData()
            expect(tempEnvelopes[tempEnvelopes.length - 1].idStack).toBe(2500)
        } catch (error) {
            expect(error).toBeNull()
        }

        //Test remove test data
        try {
            await dal.removeStackData(stack.id)
            await dal.removeEnvelopeData(envelope.id)
        } catch (error) {
            expect(error).toBeNull()
        }

        //Testing that data before = after test
        try {
            expect(stacks).toEqual(await dal.getStackData())
            expect(envelopes).toEqual(await dal.getEnvelopeData())
        } catch (error) {
            expect(error).toBeNull()
        }

    })
})
