import { createConnection } from 'typeorm'
import {corticalStackSchema, envelopeSchema} from './Schemas'

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

  async getStackData(){
    const connection = await this.connect()
    try{
        const dataRepositoryStacks = connection.getRepository(CorticalStack)
        return await dataRepositoryStacks.find()
    }catch(err){
        console.error(err.message)
    }finally{
        connection.close()
    }
}   

async getEnvelopeData(){
    const connection = await this.connect()
    try{
        const dataRepositoryEnvelopes = connection.getRepository(Envelope)
        return await dataRepositoryEnvelopes.find()
    }catch(err){
        console.error(err.message)
    }finally{
        connection.close()
    }
}   

async saveStackData(Sta){
    const connection = await this.connect()
    try{
        const dataRepositoryStacks = connection.getRepository(CorticalStack)
        await dataRepositoryStacks.save(Sta)
        return Sta
    }catch(err){
        console.error(err.message)
    }finally{
        connection.close()
    }
}  

async saveEnvelopeData(Envel){
    const connection = await this.connect()
    try{
        const dataRepositoryEnvelopes = connection.getRepository(Envelope)
        await dataRepositoryEnvelopes.save(Envel)
        return Envel
    }catch(err){
        console.error(err.message)
    }finally{
        connection.close()
    }
} 

async removeStackData(StaId){
    const connection = await this.connect()
    try{
        let sql = `DELETE FROM CorticalStacks WHERE id = ?`;

         // delete a row with id 1
        await connection.query(sql, StaId, error => {
        if (error)
         return console.error(error.message);
         })

    }finally{
        connection.close()
    }
}  

async removeEnvelopeData(EnvelId){
    const connection = await this.connect()
    try{
        let sql = `DELETE FROM Envelopes WHERE id = ?`;

         // delete a row with id 1
        await connection.query(sql, EnvelId, error => {
        if (error)
         return console.error(error.message);
         })

    }finally{
        connection.close()
    }
} 
}
export default Dal
