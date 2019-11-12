import express from 'express'
import bodyParser from 'body-parser'

import { getClinic } from './weiClinic'

const app = express()
const port = 8081

app.use(bodyParser.json())
app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/digitize', (req, res) => {
    const gender = req.query.gender, name = req.query.name, age = req.query.age

    //Check if the 3 parameter are present and age is a int
    if (gender && name && age && (age === '' + parseInt(age))) {
        const createdElements = getClinic().create(gender, name, parseInt(age))
        res.status(200).set({ 'Content-Type': 'application/json' }).json(createdElements).end();
    } else {
        //if all parameters are here but age isn't a int : 
        if (gender && name && age) {
            res.status(400).json({
                message: "Age parameter must be a number",
                receive: {
                    gender: gender,
                    name: name,
                    age: age
                }
            }).end();

        } else { //missing parameter(s)
            res.status(400).json({
                message: "missing parameter",
                receive: {
                    gender: gender,
                    name: name,
                    age: age
                },
                needed: ["gender", "name", "age"]
            }).end();
        }
    }
}) //end digitize


app.post('/remove/:stackId', (req, res) => {
    const stackId = req.params.stackId

    try {
        //stackId must exist and be a number
        if (!stackId || !(stackId === '' + parseInt(stackId))) {
            throw "sID"
        }

        getClinic().removeStackFromEnvelope(stackId)
        res.status(204).end();

    } catch (error) {
        console.warn(error)
        if (error === "sID") {
            res.status(400).json({
                message: "Invalid call",
                receive: {
                    stackId: stackId
                }
            }).end();
        } else if (error === 2) {
            res.status(400).json({
                message: "Can't find envelope with input stack",
                receive: {
                    stackId: stackId
                }
            }).end();
        } else {
            res.status(418).json({
                message: "Unkown Error",
                receive: {
                    stackId: stackId
                }
            }).end();
        }
    }
})

const server = app.listen(port, () => {
    const port = server.address().port
    console.log("Server listening on port " + port + "...")
})

export default server