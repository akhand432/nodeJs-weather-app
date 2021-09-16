console.log("Getting rendered from the static pages");

function getWeatherUpdates() { 
    // const address = document.getElementById('loc').value;
    // var responseText = document.getElementById('location');
    // responseText.innerHTML = 'Loading...';

    // fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ2Vla3lzcHlkZXIiLCJhIjoiY2twcGYyY3M5MDFkbzJ3bzF2cm05Zm13aiJ9.am_LA5kOC9yXiMqJXNpkLA&limit=1')
    // .then(response => response.json()).then(data => {
    //     console.log(data.features[0].place_name) 
    //     var place_name = data.features[0].place_name;
    //     responseText.innerHTML = place_name;
    // });
} 

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location + '').then(response => response.json().then(data => {
        if(data.error) {
            messageOne.textContent = data.error;
        }
        else {
           messageOne.textContent = data.location;
           messageTwo.textContent = data.forcastData;
        }
    }));
})


 