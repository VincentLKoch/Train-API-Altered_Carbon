import { createConnection } from 'typeorm'
import { corticalStackSchema, envelopeSchema } from './Schemas'
import CorticalStack from './corticalStack'
import Envelope from './Envelope'

class Dal {
    async connect() {
        try {
            return await createConnection({
                type: 'mysql',
                host: '0.0.0.0',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'db_alteredCarbon',
                entities: [corticalStackSchema, envelopeSchema]
            })
        } catch (err) {
            console.error('Unable to connect')
            throw err
        }
    }

    async getStackData() {
        const connection = await this.connect()
        try {
            const dataRepositoryStacks = connection.getRepository(CorticalStack)
            return await dataRepositoryStacks.find()
        } catch (err) {
            console.error(err.message)
            throw err
        } finally {
            await connection.close()
        }
    }

    async getEnvelopeData() {
        const connection = await this.connect()
        try {
            const dataRepositoryEnvelopes = connection.getRepository(Envelope)
            return await dataRepositoryEnvelopes.find()
        } catch (err) {
            console.error(err.message)
            throw err
        } finally {
            await connection.close()
        }
    }

    async digitize(newStack, newEnvelope) {
        const connection = await this.connect()
        try {
            //First get Repository
            const dataRepositoryStacks = connection.getRepository(CorticalStack)
            const dataRepositoryEnvelopes = connection.getRepository(Envelope)

            //We put newStack in SQL
            await dataRepositoryStacks.save(newStack)
            //Since we got stack id we use it
            newEnvelope.stackId = newStack.id

            //We save Envelope
            await dataRepositoryEnvelopes.save(newEnvelope)

            //Now we have envelope Id we update it on stack
            newStack.envelopeId = newEnvelope.id
            //and update on SQL
            await dataRepositoryStacks.save(newStack)

            return newStack, newEnvelope

        } catch (err) {
            console.error(err.message)
            throw err
        } finally {
            await connection.close()
        }
    }

    async removeStackData(stackId) {
        const connection = await this.connect()
        try {
            await connection
                .createQueryBuilder()
                .delete()
                .from(CorticalStack)
                .where("id=:id", { id: stackId })
                .execute();
        } catch (error) {
            console.error(error.message)
            throw error
        } finally {
            await connection.close()
        }
    }

    async removeEnvelopeData(envelopeId) {
        const connection = await this.connect()
        try {
            await connection
                .createQueryBuilder()
                .delete()
                .from(Envelope)
                .where("id=:id", { id: envelopeId })
                .execute();
        } catch (error) {
            console.error(error.message)
            throw error
        } finally {
            await connection.close()
        }
    }

    async moveStackToEnvelope(StackId, EnvelopeID) {
        const connection = await this.connect()
        try {
            await connection.createQueryBuilder()
                .update(CorticalStack)
                .set({ idEnvelope: EnvelopeID })
                .where("id=:id", { id: StackId })
                .execute();
        } catch (error) {
            console.error(error.message)
            throw error
        } finally {
            await connection.close()
        }
    }

    async moveEnvelopeToStack(EnvelopeID, StackId) {
        const connection = await this.connect()
        try {
            await connection.createQueryBuilder()
                .update(Envelope)
                .set({ idStack: StackId })
                .where("id=:id", { id: EnvelopeID })
                .execute();
        } catch (error) {
            console.error(error.message)
            throw error
        } finally {
            await connection.close()
        }
    }

}//end DAL

export default Dal
