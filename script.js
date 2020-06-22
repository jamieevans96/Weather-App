const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let city = 'London';
let newCity = document.getElementById('city');
let button = document.getElementById('button');
let degSwitch = document.getElementById('switch');
let title = document.createElement('h1');
let temp = document.createElement('h3');
let desc = document.createElement('h3');
let wind = document.createElement('h3');
let hum = document.createElement('h3');
let div = document.getElementById('div');
let innerDiv = document.createElement('div');
let tempVal;

let checkFetch = function(response) {
    if (!response.ok) {
    alert('City not found');
    } else {
    return response;
    }
}

let updateData = function(data) {
    title.innerHTML = data.name;
    tempVal = data.main.temp;
    if (degSwitch.checked) {
        temp.innerHTML = 'Temperature: ' + (((tempVal - 273.15) * 9 / 5 ) + 32).toFixed(1) + ' °F';
    } else {
        temp.innerHTML = 'Temperature: ' + (tempVal - 273.15).toFixed(1) + ' °C';
    }
    desc.innerHTML = 'Description: ' + data.weather[0].main;
    wind.innerHTML = 'Wind Speed: ' + data.wind.speed+ ' km/h';
    hum.innerHTML = 'Humidity: ' + data.main.humidity + '%';
    innerDiv.append(title, temp, desc, wind, hum);
    div.append(innerDiv);
}

let fetchCity = function() {
    const api_url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=318473b8daedc28b5d4cc09ede4c83fc';

    fetch(api_url)
    .then(checkFetch)
    .then(function(response) {
    return response.json();
    })
    .then(updateData)
    .catch(function(error) {
    console.log('Error');
    console.log(error);
    });
}

button.addEventListener('click', function() {
    city = newCity.value;
    fetchCity();
})

degSwitch.addEventListener('change', function() {
    fetchCity();
})

fetchCity();