const request = require("request")

const params = {
    access_key: "251ddc44e0ea8c932e15e5c4c5c6f09e"
}

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${params.access_key}&query=${latitude},${longitude}`

    request({url, json: true}, (err, res) => {
        if(err) {
            callback("Unable to connect to weather API !!", undefined)
        } else if(res.body.error) {
            callback("Location provided could not be fetched. Please try another location.", undefined)
        } else {
            callback(undefined,res.body.current)
        }
    })
}

module.exports = forecast