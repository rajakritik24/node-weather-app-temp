const request = require('request')

const params = {
  access_key: "f01724ce46a77938bd19dfff4fba53e0",
};


const geocode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=${params.access_key}&query=`;
  request({url: url + encodeURIComponent(address), json: true}, (err, res) => {
    if(err) {
      callback("Unable to connect to geocoding API !!", undefined)
    } else if(!res.body.data || res.body.data.length === 0) {
      callback("Unable to get the location. Try another location.")
    } else {
      callback(undefined, res.body.data[0])
    }
  })
}

// geocode("Mumbai")
module.exports = geocode