const request = require('postman-request')
const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=52c225b45f963758709de26da87813e1&query='+latitude +','+longitude
    request({url,json : true},(error,{body}={}) => {
        if(error) {
            callback('Unable to connect to Internet.',undefined)
        }
        else if (body.error) {
            callback(body.error.info,undefined)
        } else{
            callback(undefined,'Temperature: '+ body.current.temperature + ' degrees, but it Feels Like: '+ body.current.feelslike)
        } 
    })
}
module.exports = forecast