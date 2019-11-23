import { getNewId } from './idHelper'
import CorticalStack from './corticalStack'
import Envelope from './Envelope'
import mysql from 'mysql2/promise'
import {corticalStackSchema, envelopeSchema} from './Schemas'

class WeiClinic {
    constructor() {
    }

    async connect(){
        try{
            return await mysql.createConnection({
                type: 'mysql',
                host: '0.0.0.0',
                port: 3306,
                user: root,
                password: root,
                database: db_alteredCarbon,
                entities: [corticalStackSchema, envelopeSchema]
            })
        }catch(err){
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

   async create(realGender, name, age) {
        const connection = await this.connect()

        try{
        const dataRepositoryStacks = connection.getRepository(CorticalStack)
        const dataRepositoryEnvelopes = connection.getRepository(Envelope)

        const newStack = new CorticalStack(null, realGender, name, age, null)
        const newEnvelope = new Envelope(null, realGender, age, null)

        await dataRepositoryStacks.save(newStack)
        await dataRepositoryStacks.save(newEnvelope)

        newEnvelope.idStack = newStack.id
        newStack.idEnvelope = newEnvelope.id

        await dataRepositoryStacks.save(newStack)
        await dataRepositoryEnvelopes.save(newEnvelope)

        return {
            corticalStack: newStack,
            envelope: newEnvelope
        }
    }catch(err){
        console.error(err.message)
        throw err
    }finally{
        await connection.close()
    }}

   async assignStackToEnvelope(idStack, idEnvelope) {

        const stacks = this.getStackData()
        const stack = await stacks.find(sta => { return sta.id == idStack })

        if (!stack) {
            throw "ad1" //400
        }

        if (!(stack.idEnvelope === null)) { throw "ad2" }

        const envelopes = this.getEnvelopeData()
        let envelope

        if (idEnvelope) {
            envelope = await envelopes.find(env => { return env.id == idEnvelope })
            if (!envelope) { throw "ad3" } //400
            if (!(envelope.idStack === null)) { throw "ad4" } //envelope already have a stack, error 400

        } else {
            envelope = await envelopes.findOne(env => { return env.idStack === null })
            if (!envelope) { throw "ad5" } //404
        }

        envelope.idStack = stack.id
        stack.idEnvelope = envelope.id

        this.saveStackData(stack)
        this.saveEnvelopeData(envelope)

    }

    async removeStackFromEnvelope(idStack) {
        const stacks = this.getStackData()
        const envelopes = this.getEnvelopeData()

        const stack = await stacks.find(sta => { return sta.id == idStack })
        if (!stack) { //stack not found
            throw "rm1"
        }

        //stack isn't inside an envelope
        if (!stack.idEnvelope) {
            throw "rm2"
        }

        const envelope = await envelopes.find(env => { return env.id == stack.idEnvelope })
        //can't find envelope
        if (!envelope) { 
            throw "rm3"
        }

        envelope.idStack = null
        stack.idEnvelope = null

        this.saveStackData(stack)
        this.saveEnvelopeData(envelope)
    }

    async killEnvelope(idEnvelope) {
        const stacks = this.getStackData()
        const envelopes = this.getEnvelopeData()

        const envelope = await envelopes.find(env => env.id == idEnvelope)
        if (!envelope) { //not found
            throw "kil"
        }

        //If envelope got a Stack we remove it first
        if (envelope.idStack) {
           stack = await stacks.find(sta => { return sta.id == envelope.idStack })
           stack.idEnvelope = null
        }
        this.saveStackData(stack)
        this.removeEnvelopeData(idEnvelope)
    }

    async destroyStack(idStack) {
        const stacks = this.getStackData()
     ]
        const stack = await stacks.find(sta => { return sta.id == idStack })
        if (!stack) {
            throw "ds"
        }
        //if stack is in a envelope the envelope is erase too
        if (stack.idEnvelope) {
            this.removeEnvelopeData(stack.idEnvelope)
        }

        this.removeStackData(idStack)
        }
}
const weiClinic = new WeiClinic()

export const getClinic = () => weiClinic