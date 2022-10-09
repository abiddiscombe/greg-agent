// index.mjs

import * as dotenv from 'dotenv'

if (process.argv[2] == '-development') {
    dotenv.config()
}

import { greg } from './utils/greg.js'
import express from 'express'

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const config = {
    port: process.env.SVR_PORT || 3000,
    greg: {
        bearerToken: process.env.SVR_GREG_TOKEN,
        refreshInterval: process.env.SVR_REFRESH_INTERVAL || 1800
    }
}

if (!config.greg.bearerToken) {
    throw new Error("🛑 Greg API credentials are missing. Aborting.")
}

let dataCache = {
    status: 200,
    payload: {
        lastFetch: 0,
        plants: []
    }
}

app.get('/', async function (req, res) {
    if (Math.floor(Date.now() / 1000) - dataCache.payload.lastFetch > config.greg.refreshInterval || dataCache.status != 200) {
        dataCache = await greg.fetch(dataCache, config.greg.bearerToken)
    }
    res.status(dataCache.status)
    res.json(dataCache.payload)
})

app.listen(config.port, () => {
    console.log(`🚀 Server Started.`)
    console.log(`📡 Listening on port :${config.port}`)
})