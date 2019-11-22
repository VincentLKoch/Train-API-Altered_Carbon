import CorticalStack from './corticalStack'
import Envelope from './Envelope'
import {EntitySchema} from 'typeorm'

export const corticalStackSchema = new EntitySchema({
    tableName: 'CorticalStacks',
    name: 'corticalStack',
    target: CorticalStack,
    columns: {
        id:{
            primary: true,
            generated: true,
            type: 'int'
        },

        realGender: {
            type: 'varchar',
            nullable: false
        },

        name: {
            type: 'varchar',
            nullable: false
        },

        age: {
            type: 'int',
            nullable: false
        },

        idEnvelope:{
            type: 'int',
            nullable: true
        },
    }
})

export const envelopeSchema = new EntitySchema({
    tableName: 'Envelopes',
    name: 'envelope',
    target: Envelope,
    columns: {
        id:{
            primary: true,
            generated: true,
            type: 'int'
        },

        gender: {
            type: 'varchar',
            nullable: false
        },


        age: {
            type: 'int',
            nullable: false
        },

        idStack:{
            type: 'int',
            nullable: true
        },
    }
})