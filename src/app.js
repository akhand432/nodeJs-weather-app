const express = require('express'); 
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weatherMap = require('./utils/weather-app');

const app = express();

console.log(__dirname);
console.log(__filename);

//Define path for the Express config
app.use(express.static(path.join(__dirname, '../public')));
const viewPath=path.join(__dirname,'../templates/views'); 
const partialPath=path.join(__dirname,'../templates/partials');

// app.get('', (req,res) => {
//     res.send('Hello Express!!');
// });

// Setup handlebar engine and view locations
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

app.get('',(req,res) => {
    res.render('index',{
        title: "The Weather App",
        Name: "Akhand Pratap Singh" 
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: "The Help Section",
        Name: "Akhand Pratap Singh" 
    })
})

// app.get('/help', (req,res) => {
//     res.send('Help Section!!');
// })

app.get('/about',(req,res) => {
    res.send('About Section@')
})

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please enter the proper query terms'
    }); 
}
geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
    if (error) {
        return res.send({
            error
        })
    }

    weatherMap(latitude,longitude, (error,forcastData) => {
        if (error) {
            return res.send({
                error
            })
        }
        res.send({
            location: location,
            forcastData: forcastData
        });
    })
});
    
})

app.get('/help/*',(req,res) => {
    res.render('helpArticle',{
        message: "Help Article not found",
        Name: "Akhand Pratap Singh"
    })
})

app.get('/*',(req,res) => {
    res.render('error',{
    message: "404 Page Not Found",
    Name: "Akhand Pratap Singh" 
    })
})

app.listen('3000',() => {
    console.log('Server is running on the port 3000!');
}) 