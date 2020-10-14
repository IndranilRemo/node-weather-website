const path = require('path')
const express = require('express')
const hbs =require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
// setting path for config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App | Handlebars',
        name: 'Indranil Banerjee'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title:'Weather Help Page | Handlebars',
        name:'Indranil Banerjee'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title:'Weather About Page | Handlebars',
        name:'Indranil Banerjee'
    })
})
app.get('/weather',(req,res) => {

    if(!req.query.address) {

        return res.render('weather/error',{
            error : 'You must Provide Address!',
            title : 'Current Weather Stats | Handlebars',
            name : 'Indranil Banerjee'
        })
    }
    const address = req.query.address
    geocode(address,(error,{latitude,longitude,location} = {}) =>{
        if(error) {
            return res.send({
                error,
                title : 'Current Weather Stats | Handlebars',
                name : 'Indranil Banerjee'
            })
        } else {
            try{
                forecast(latitude,longitude, (error,forecastData) => {
                    if(error) {
                        return res.send({
                            error,
                            title : 'Current Weather Stats | Handlebars',
                            name : 'Indranil Banerjee'
                        })
                    } else {
                        res.send({
                            title : 'Current Weather Stats | Handlebars',
                            name : 'Indranil Banerjee',
                            location,
                            forecast : forecastData,
                            address
                        })
                    }  
                })
            }
            catch(e){
                return res.render('weather/error',{
                    error,
                    title : 'Current Weather Stats | Handlebars',
                    name : 'Indranil Banerjee'
                })
            }    
        }   
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: 404 + ': Page not Found',
        description:'Page not Found'
        // name:'Indranil Banerjee'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})

