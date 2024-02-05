/*
We have three errors: 
Geolocation api fails, fetching weather fails, 
retrieving location fails
*/



const apiKey = 'c667d7735e5a7073d5ff3bfa4dc217de';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';



// if success, call succes function
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    const apiUrl = `${baseURL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    
    
    fetch(apiUrl).then(response => response.json()).then(data => {
        console.log("Weather data:", data);
        // pass weather object to parse
        displayWeather(data);
        
      
    }).catch(error => {
        console.error('Error fetching weather data:', error);
    });
}



// error function for getCurrentLocation function
function error() {
    console.error('Unable to retrieve your location');
}
        
//check if the GeoLocation API is supported 
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    console.error('Geolcation is not supported in this browser');
}
    
function displayWeather(data) {
    // collect weather attributes
    const feelsLikeTemp = kelvinToCelsius(data.main.feels_like);
    const minTemp = kelvinToCelsius(data.main.temp_min);
    const maxTemp = kelvinToCelsius(data.main.temp_max);
    const humidity = data.main.humidity + '%';

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('en-US', {month: 'short'});
    const year = currentDate.getFullYear();
    const weekday = currentDate.toLocaleString('en-US', {weekday: 'long'});
    currentDate.toLocaleString()
   
    const city = data.name;
    const country = data.sys.country;
            
    const weatherHTML = `

        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Weather Data</h5>
                <h6 class="card-title">Todays Date:</h6>
                <p class="card-text">${weekday}, ${month} ${day}${getOrdinalSuffix(day)}, ${year}</p>
                <p class="card-text">${city}, ${country}</p>
                <p class="card-text">Feels Like: ${feelsLikeTemp.toFixed(2)}</p>
                <p class="card-text">Min Temp: ${minTemp.toFixed(2)}</p>
                <p class="card-text">Max Temp: ${maxTemp.toFixed(2)}</p>
                <p class="card-text">Humidity: ${humidity}</p>
                <!-- Add more weather data fields as needed -->
            </div>
        </div>
        
    `;
    
    // get div object to display in page
    const containerObject = document.getElementById('station-info');
    containerObject.innerHTML = weatherHTML;
            
    
}
    
function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function getOrdinalSuffix(day) {
    let suffix;

    const lastDigit = day % 10;

    if(lastDigit === 1 && day !== 11) {
        suffix = 'st';
    } else if(lastDigit === 2 && day !== 12) {
        suffix = 'nd';
    } else if(lastDigit === 3 && day !== 13) {
        suffix = 'rd';
    } else {
        suffix = 'th';
    }

    return suffix;
}