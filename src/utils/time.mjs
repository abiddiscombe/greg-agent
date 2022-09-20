// utils/time.mjs

export {
    time
}

const time = {

    now: function() {
        return Math.floor(Date.now() / 1000)
    }

}