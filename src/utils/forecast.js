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
            const stats = 'Temperature: '+ body.current.temperature + ' degrees, Feels Like: '+ body.current.feelslike +
            '. Wind Speed: '+body.current.wind_speed + ' km/hr from '+body.current.wind_dir
            callback(undefined,stats)
        } 
    })
}
module.exports = forecast