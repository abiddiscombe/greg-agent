// utils/callGreg.mjs

import fetch from 'node-fetch';

import { time } from '../utils/time.mjs'

export {
    greg
}

const greg = {

    refresh: async function callGreg(authToken) {
    
        let response = await fetch('https://api.greg.app/plants/plants-v2/', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
    
        if (response.status != 200) {
            return false
        }

        let responseJSON = await response.json()

        let output = {
            ts: time.now(),
            plants: []
        }

        for ( let i = 0; i < responseJSON.plants.length; i++ ) {
            output.plants.push({
                name: responseJSON.plants[i].name,
                species: responseJSON.plants[i].species_name,
                isHealthy: responseJSON.plants[i].plantcard_sections[0].items[0].is_healthy
            })
        }
    
        return output
    
    }
    
}

