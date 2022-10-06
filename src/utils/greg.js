// utils/greg.js

import fetch from 'node-fetch'

export const greg = {

    fetch: async (dataCache, bearerToken) => {
        let response = await fetch('https://api.greg.app/plants/plants-v2/', {
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            }
        })
    
        if (response.status != 200) {

            console.error(`🚨 Error connecting to the Greg Internal API.`)
            dataCache.status = 500
            dataCache.payload = {
                'Internal Error': 'Error connecting to the Greg Internal API. Check your authentication credentials.'
            }

        } else {

            let responseJson = await response.json()

            dataCache = {
                status: 200,
                payload: {
                    lastFetch: Math.floor(Date.now() / 1000),
                    plants: []
                }
            }

            for (let i = 0; i < responseJson.plants.length; i++) {
                dataCache.payload.plants.push({
                    url: responseJson.plants[i].share_url,
                    img: responseJson.plants[i].photo,
                    name: responseJson.plants[i].name,
                    species: responseJson.plants[i].species_name,
                    isHealthy: responseJson.plants[i].plantcard_sections[0].items[0].is_healthy
                })
            }

            console.error(`🔽 Cache updated via the Greg Internal API (TS: ${dataCache.payload.lastFetch}).`)

        }

        return dataCache
    }

}