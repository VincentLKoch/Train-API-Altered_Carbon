import express from 'express'
import bodyParser from 'body-parser'

import {getClinic} from './weiClinic'

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
    // Retrieve gender, age and name

    const createdElements = getClinic().create(gender, name, age)

    res.status(200).set({ 'Content-Type': 'application/json' }).json(createdElements)
})

const server = app.listen(port, () => {
    const port = server.address().port
    console.log("Server listening on port " + port + "...")
})

export default server