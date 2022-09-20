// index.mjs

import express from 'express'

import { greg } from './utils/greg.mjs'
import { time } from './utils/time.mjs'

const app = express()

const config = {
    port: process.env.PORT || 3000
}
const auth = {
    greg: process.env.GREG_BEARER_TOKEN || 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVPY0VyZThNRHJoODRJRWRzakd4ZyJ9.eyJpc3MiOiJodHRwczovL2xvZ2luLmdyZWcuYXBwLyIsInN1YiI6ImFwcGxlfDAwMTk4Ny5jZjVjMmQwNDRhMDQ0OGM5OGRhNjdlODk3YTQ2OWJjZC4xMjA5IiwiYXVkIjpbImFwaS5wbGFudHguY28iLCJodHRwczovL2Rldi1zMjVnN2h1Yi5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjYzMjYyMDEwLCJleHAiOjE2NjU4NTQwMTAsImF6cCI6IlZTQTQ4Ukc4WVFDZjJEUHdBTUlyWlRqUGxiOGtZalZ6Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBvZmZsaW5lX2FjY2VzcyJ9.ZOqj56Cs4-5scjjq4GjxmtKJ0xJA6MrHnrhiNfVNHerWWsQmJjdxkUum-tFcb5PvyJM1ZLPemBix59pY94bJo1oiDMQMlgGejpAHlYG6-0R_pcy2I0wUGkpPPMq54_3oozvXDUjiApmW3pECcgRz9ALpNw-gCQeeiYSmRtCwWHWzMJUw8LVvfLm-kw2RbYm-GWefL8kQeTP5gdNS90yg6bnZoXL9U1D_LXZ0qAzn4TJRTc9aiqgCQvXnBKy6yZrr0J0A6QirTYVgi-ilg1RT4t-jYdpBT6QZZlx326E---ETphA6NhfQSZttDqZzOPZ0cUUiEqYvhdIyAYe7qr91xA',
    external: process.env.EXTERNAL_ACCESS_KEY,
}

let gregResponseCache = {
    unixTs: 0
}

app.get('/', function (req, res) {
    res.status(404)
    res.json({
        'Error': 'Nothing here. Try /raw or /pretty for data.'
    })
})

app.get('/pretty', async function (req, res) {
    res.status(404)
    res.json({
        'Error': 'Nothing here. Try /raw or /pretty for data.'
    })
})

app.get('/raw', async function (req, res) {

    if ( time.now() - gregResponseCache.unixTs <= 1800 ) {

        console.log(`Returning data from cache ${gregResponseCache.unixTs}`)
        res.json(gregResponseCache)

    } else {
        console.log(`Stale cache. Updating...`)
    }

    gregResponseCache = await greg.refresh(auth.greg)

    if (!gregResponseCache.status) {
        res.status(500)
        res.json({
            'Error': 'Failed to connect to the Greg API'
        })
    }

    res.json(gregResponseCache.plants)

})

app.listen(config.port, () => {
    console.log(`🚀 Server Started. Listening on port :${config.port}`)
})