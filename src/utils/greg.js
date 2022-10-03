// utils/callGreg.mjs

import fetch from 'node-fetch';

export {
    greg
}

const greg = {

    refresh: async (authToken) => {
    
        let response = await fetch('https://api.greg.app/plants/plants-v2/', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
    
        if (response.status != 200) {
            return false
        }

        let responseJson = await response.json()

        let output = {
            ts: Math.floor(Date.now() / 1000),
            plants: []
        }

        for ( let i = 0; i < responseJson.plants.length; i++ ) {
            output.plants.push({
                name: responseJson.plants[i].name,
                species: responseJson.plants[i].species_name,
                isHealthy: responseJson.plants[i].plantcard_sections[0].items[0].is_healthy
            })
        }
    
        return output
    
    }
    
}

