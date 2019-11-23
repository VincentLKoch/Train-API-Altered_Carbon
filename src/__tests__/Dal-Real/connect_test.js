import Dal from '../../dal'

describe('DAL test', () => {

    it('Test Connection', async () => {
        try {
            const dal = new Dal()
            let connection
            connection = await dal.connect()
            connection.close()
        } catch (error) {
            expect(error).toBeNull()
        }
    });
})