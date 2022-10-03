// index.mjs

import * as dotenv from 'dotenv'

if (process.argv[2] == '-development') {
    dotenv.config()
}

import express from 'express'

import { greg } from './utils/greg.mjs'

const app = express()

const config = {
    port: process.env.SERVER_PORT || 3000,
    gregBearerToken: process.env.SERVER_AUTH_GREG
}

let gregResponseCache = {
    ts: 0,
    plants: []
}

app.get('/', async function (req, res) {

    let requestPayload = {
        status: 200,
        bodyJSON: {}
    }

    if (Math.floor(Date.now() / 1000) - gregResponseCache.ts < 1800) {

        requestPayload.bodyJSON = gregResponseCache

    } else {

        gregResponseCache = await greg.refresh(config.gregBearerToken)

        if (!gregResponseCache) {
            console.error(`🚨 Error connecting to the Greg Internal API.`)
            requestPayload.status = 500
            requestPayload.bodyJSON = {
                'Internal Error': 'Error connecting to the Greg Internal API. Check your authentication credentials.'
            }
        } else {
            requestPayload.bodyJSON = gregResponseCache
        }
    
    }
    
    res.status(requestPayload.status)
    res.json(requestPayload.bodyJSON)

})

app.listen(config.port, () => {
    console.log(`🚀 Server Started.`)
    console.log(`📡 Listening on port :${config.port}`)
})