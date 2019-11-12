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
        //invalid stackID
        if (error === "sID") {
            res.status(400).json({
                message: "Invalid call",
                receive: {
                    stackId: stackId
                }
            }).end();

            //catch error from removeStackFromEnvelope :
        } else if (error === "rm1") {
            res.status(400).json({
                message: "Can't find input stack",
                receive: {
                    stackId: stackId
                }
            }).end();
        } else if (error === "rm2") {
            res.status(400).json({
                message: "Stack don't have envelope",
                receive: {
                    stackId: stackId
                }
            }).end();

            //Unkown
        } else {
            console.error(error)
            res.status(418).json({
                message: "Unkown Error",
                receive: {
                    stackId: stackId
                }
            }).end();
        }
    }
}) //end remove


app.post('/kill/:envelopeId', (req, res) => {

    const envelopeId = req.params.envelopeId
    try {
        //envelopeId must exist and be a number
        if (!envelopeId || !(envelopeId === '' + parseInt(envelopeId))) {
            throw "eID"
        }
        getClinic().killEnvelope(envelopeId)

        res.status(204).end();

    } catch (error) {
        console.warn("error:")
        console.warn(error)
        //invalid envelopeId
        if (error === "eID") {
            res.status(400).json({
                message: "Invalid call",
                receive: {
                    envelopeId: envelopeId
                }
            }).end();

            //catch error from removeStackFromEnvelope :
        } else if (error === "kil") {
            res.status(400).json({
                message: "Can't find input envelope",
                receive: {
                    envelopeId: envelopeId
                }
            }).end();

            //Unkown
        } else {
            console.error(error)
            res.status(418).json({
                message: "Unkown Error",
                receive: {
                    envelopeId: envelopeId
                }
            }).end();
        }
    }
})

app.put('/implant/:stackId/:envelopeId?', (req, res) => {
    const stackId = req.params.stackId
    const envelopeId = req.params.envelopeId
    try {
        //stackId must exist and be a number
        if (!stackId || !(stackId === '' + parseInt(stackId))) {
            throw "sID"
        }
        getClinic().assignStackToEnvelope(stackId, envelopeId)
        res.status(204).end();

    } catch (error) {
        console.warn(error)
        //invalid stackID
        if (error === "sID") {
            res.status(400).json({
                message: "Invalid call",
                receive: {
                    stackId: stackId,
                    envelopeId: envelopeId
                }
            }).end();
            //catch error from assignStackToEnvelope :
        } else if (error === "ad1") {
            res.status(400).json({
                message: "Can't find input stack",
                message: "Unkown stack",
                receive: {
                    stackId: stackId,
                    envelopeId: envelopeId
                }
            }).end();
        } else if (error === "ad2") {
            res.status(400).json({
                message: "Can't find input envelope",
                message: "Unkown envelope",
                receive: {
                    stackId: stackId,
                    envelopeId: envelopeId
                }
            }).end();
        } else if (error === "ad3") {
            res.status(400).json({
                message: "Envelope already got a stack inside",
                message: "Unkown stack",
                receive: {
                    stackId: stackId,
                    envelopeId: envelopeId
                }
            }).end();
        } else if (error === "ad4") {
            res.status(404).json({
                message: "Can't find an available envelope",
                receive: {
                    stackId: stackId,
                    envelopeId: envelopeId
                }
            }).end();

        } else {
            console.error(error)
            res.status(418).json({
                message: "Unkown Error",
                receive: {
                    stackId: stackId,
                    envelopeId: envelopeId
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