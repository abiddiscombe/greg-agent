// index.mjs

import * as dotenv from 'dotenv'

if (process.argv[2] == '-development') {
    dotenv.config()
}

import express from 'express'

import { greg } from './utils/greg.mjs'
import { time } from './utils/time.mjs'

const app = express()

const config = {
    port: process.env.SERVER_PORT || 3000,
    gregBearerToken: process.env.SERVER_AUTH_GREG
}

let gregResponseCache = {
    ts: 0,
    plants: []
}



app.get('/', function (req, res) {
    res.status(404)
    res.json({
        'Error': 'The SVG endpoint is not yet supported'
    })
})

app.get('/raw', async function (req, res) {

    let requestPayload = {
        status: 200,
        bodyJSON: {}
    }

    if (time.now() - gregResponseCache.ts < 1800) {

        // return data from the cache
        requestPayload.bodyJSON = gregResponseCache

    } else {

        // fetch new values from the API
        gregResponseCache = await greg.refresh(config.gregBearerToken)

        // check if the request succeeded
        if (!gregResponseCache) {
            console.error(`🛑 Failed to recieve data from the Greg Internal API. Are the authentication params accurate?`)
            requestPayload.status = 500
            requestPayload.bodyJSON = {
                'Error': 'Failed to connect to the internal Greg API'
            }
        } else {
            // send the newly cached data to the client
            requestPayload.bodyJSON = gregResponseCache
        }
    
    }

    // express: send the data
    res.status(requestPayload.status)
    res.json(requestPayload.bodyJSON)

})

app.listen(config.port, () => {
    console.log(`🚀 Server Started.`)
    console.log(`📡 Listening on port :${config.port}`)
})