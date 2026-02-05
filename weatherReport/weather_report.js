const apiKey = '369bcb7bfc0dbe3c053bf2536a8c8f5c';  //note to self: this is a BAD IDEA for any real APIs
const weatherInfo = document.getElementById('weatherInfo');

function showWeatherDetails(event) {
    event.preventDefault();

    //lab built on an older version of OpenWeather that did geocoding and weather retrieval in one step
    //now we need a 2 step process, to get the lat long of the city and then find the weather for that location
    //todo: error handling for null response

    //first step, geocoding city name into lat & lon
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    let lat, lon;

    const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&appid=${apiKey}`;

    fetch(geocodeURL)
        .then(response => response.json())
        .then(data => {
            lat = data[0].lat;
            lon = data[0].lon;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
            return fetch(apiUrl);
        })
        //retrieved lat/lon and passed them back to OpenWeather, should have actual weather now    
        .then(response => response.json())
        .then(data => {
            weatherInfo.innerHTML = `<h2>Weather in ${city}, ${state} (Lat: ${lat} Lon: ${lon}) is:</h2>
                                    <p>Temperature: ${data.main.temp} &#8457;</p>
                                    <p>Weather: ${data.weather[0].description}</p>`;
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<p>Failed to fetch weather. Please try again.</p>`;
        });
}

//run the thing when the submit button is clicked / form is submitted
//note: needs data validaiton for input fields
document.getElementById('weatherForm').addEventListener('submit', showWeatherDetails);