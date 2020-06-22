let city = 'London';
let newCity = document.getElementById('city');
let button = document.getElementById('button');
let degSwitch = document.getElementById('switch');
let title = document.createElement('h1');
let temp = document.createElement('h3');
let desc = document.createElement('h3');
let wind = document.createElement('h3');
let hum = document.createElement('h3');
let deg = ' °C';
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
        temp.innerHTML = (((tempVal - 273.15) * 9 / 5 ) + 32).toFixed(1);
    } else {
        temp.innerHTML = (tempVal - 273.15).toFixed(1);
    }
    desc.innerHTML = data.weather[0].main;
    wind.innerHTML = data.wind.speed;
    hum.innerHTML = data.main.humidity;
    console.log(data);
    document.body.append(title, temp, desc, wind, hum);
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