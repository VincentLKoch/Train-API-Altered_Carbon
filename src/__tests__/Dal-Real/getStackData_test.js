import Dal from '../../dal'

describe('DAL test', () => {

    it('Test Connection', async () => {
        try {
            const dal = new Dal()
            const resultStacks = await dal.getStackData()
            console.error(resultStacks)
        } catch (error) {
            expect(error).toBeNull()
        }
    });
})