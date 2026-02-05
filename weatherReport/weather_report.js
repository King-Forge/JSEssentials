const apiKey = '369bcb7bfc0dbe3c053bf2536a8c8f5c';  //note to self: this is a BAD IDEA for any real APIs
const weatherInfo = document.getElementById('weatherInfo');

function showWeatherDetails(event) {
    event.preventDefault();

    //lab built on an older version of OpenWeather that did geocoding and weather retrieval in one step
    //my first implementation will use literal lat and lon, we'll build in geocoding API once this works
    //todo: error handling for null response
    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            weatherInfo.innerHTML = `<h2>Weather at Lat: ${data.coord.lat} Lon: ${data.coord.lon} is:</h2>
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