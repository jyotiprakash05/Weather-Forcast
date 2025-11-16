// ==================== WEATHER CODE MAPPING ====================
const WEATHER_CODES = {
    0: { description: 'Clear sky', icon_day: '☀️', icon_night: '🌙' },
    1: { description: 'Mainly clear', icon_day: '🌤️', icon_night: '🌙' },
    2: { description: 'Partly cloudy', icon_day: '⛅', icon_night: '☁️' },
    3: { description: 'Overcast', icon_day: '☁️', icon_night: '☁️' },
    45: { description: 'Foggy', icon_day: '🌫️', icon_night: '🌫️' },
    48: { description: 'Depositing rime fog', icon_day: '🌫️', icon_night: '🌫️' },
    51: { description: 'Light drizzle', icon_day: '🌦️', icon_night: '🌧️' },
    53: { description: 'Moderate drizzle', icon_day: '🌦️', icon_night: '🌧️' },
    55: { description: 'Dense drizzle', icon_day: '🌦️', icon_night: '🌧️' },
    61: { description: 'Slight rain', icon_day: '🌧️', icon_night: '🌧️' },
    63: { description: 'Moderate rain', icon_day: '🌧️', icon_night: '🌧️' },
    65: { description: 'Heavy rain', icon_day: '🌧️', icon_night: '🌧️' },
    71: { description: 'Slight snow', icon_day: '🌨️', icon_night: '🌨️' },
    73: { description: 'Moderate snow', icon_day: '❄️', icon_night: '❄️' },
    75: { description: 'Heavy snow', icon_day: '❄️', icon_night: '❄️' },
    77: { description: 'Snow grains', icon_day: '❄️', icon_night: '❄️' },
    80: { description: 'Slight rain showers', icon_day: '🌧️', icon_night: '🌧️' },
    81: { description: 'Moderate rain showers', icon_day: '🌧️', icon_night: '🌧️' },
    82: { description: 'Violent rain showers', icon_day: '🌧️', icon_night: '🌧️' },
    85: { description: 'Slight snow showers', icon_day: '🌨️', icon_night: '🌨️' },
    86: { description: 'Heavy snow showers', icon_day: '❄️', icon_night: '❄️' },
    95: { description: 'Thunderstorm', icon_day: '⛈️', icon_night: '⛈️' },
    96: { description: 'Thunderstorm with hail', icon_day: '⛈️', icon_night: '⛈️' },
    99: { description: 'Thunderstorm with heavy hail', icon_day: '⚡', icon_night: '⚡' }
};

// ==================== STATE ====================
let appState = {
    currentLocation: { lat: 20.2961, lon: 85.8245, name: 'Bhubaneswar', country: 'India' },
    currentUnit: 'celsius',
    isDarkMode: false,
    currentWeatherData: null,
    hourlyData: null,
    dailyData: null
};

// ==================== DOM ELEMENTS ====================
const elements = {
    loading: document.getElementById('loading'),
    errorMessage: document.getElementById('errorMessage'),
    mainContent: document.getElementById('mainContent'),
    
    locationName: document.getElementById('locationName'),
    currentDate: document.getElementById('currentDate'),
    weatherIconLarge: document.getElementById('weatherIconLarge'),
    temperature: document.getElementById('temperature'),
    tempUnit: document.getElementById('tempUnit'),
    weatherCondition: document.getElementById('weatherCondition'),
    feelsLike: document.getElementById('feelsLike'),
    
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    pressure: document.getElementById('pressure'),
    uvIndex: document.getElementById('uvIndex'),
    visibility: document.getElementById('visibility'),
    sunrise: document.getElementById('sunrise'),
    sunset: document.getElementById('sunset'),
    cloudCover: document.getElementById('cloudCover'),
    
    hourlyForecast: document.getElementById('hourlyForecast'),
    dailyForecast: document.getElementById('dailyForecast'),
    
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    locationBtn: document.getElementById('locationBtn'),
    themeToggle: document.getElementById('themeToggle'),
    unitToggle: document.getElementById('unitToggle'),
    cityBtns: document.querySelectorAll('.city-btn')
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    attachEventListeners();
    requestUserLocation();
});

// ==================== THEME MANAGEMENT ====================
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    appState.isDarkMode = savedTheme === 'dark';
    updateTheme();
}

function updateTheme() {
    if (appState.isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        elements.themeToggle.textContent = '☀️';
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        elements.themeToggle.textContent = '🌙';
    }
    localStorage.setItem('theme', appState.isDarkMode ? 'dark' : 'light');
}

// ==================== EVENT LISTENERS ====================
function attachEventListeners() {
    elements.themeToggle.addEventListener('click', () => {
        appState.isDarkMode = !appState.isDarkMode;
        updateTheme();
    });

    elements.unitToggle.addEventListener('click', () => {
        appState.currentUnit = appState.currentUnit === 'celsius' ? 'fahrenheit' : 'celsius';
        updateUnitDisplay();
        updateAllWeatherDisplay();
    });

    elements.searchBtn.addEventListener('click', handleSearch);
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    elements.locationBtn.addEventListener('click', requestUserLocation);

    elements.cityBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lat = parseFloat(e.target.dataset.lat);
            const lon = parseFloat(e.target.dataset.lon);
            const cityName = e.target.textContent;
            appState.currentLocation = { lat, lon, name: cityName, country: 'India' };
            fetchWeatherData();
        });
    });
}

function updateUnitDisplay() {
    elements.tempUnit.textContent = appState.currentUnit === 'celsius' ? '°C' : '°F';
    elements.unitToggle.textContent = appState.currentUnit === 'celsius' ? '°C' : '°F';
}

// ==================== GEOLOCATION ====================
function requestUserLocation() {
    if (navigator.geolocation) {
        showLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                appState.currentLocation = { lat: latitude, lon: longitude, name: 'Current Location', country: '' };
                fetchWeatherData();
                reverseGeocode(latitude, longitude);
            },
            (error) => {
                console.log('Geolocation error:', error);
                fetchWeatherData(); // Use default location
            }
        );
    } else {
        fetchWeatherData(); // Use default location
    }
}

async function reverseGeocode(lat, lon) {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?latitude=${lat}&longitude=${lon}&language=en`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const location = data.results[0];
            appState.currentLocation.name = location.name;
            appState.currentLocation.country = location.country;
            elements.locationName.textContent = `${location.name}, ${location.country}`;
        }
    } catch (error) {
        console.error('Reverse geocoding error:', error);
    }
}

// ==================== SEARCH ====================
async function handleSearch() {
    const query = elements.searchInput.value.trim();
    if (!query) return;

    try {
        showLoading(true);
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const location = data.results[0];
            appState.currentLocation = {
                lat: location.latitude,
                lon: location.longitude,
                name: location.name,
                country: location.country
            };
            elements.searchInput.value = '';
            await fetchWeatherData();
        } else {
            showError('City not found. Please try another search.');
        }
    } catch (error) {
        showError('Error searching for city. Please try again.');
        console.error('Search error:', error);
    }
}

// ==================== API CALLS ====================
async function fetchWeatherData() {
    try {
        showLoading(true);
        clearError();

        const { lat, lon } = appState.currentLocation;
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,cloud_cover&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,wind_speed_10m_max&timezone=auto`
        );

        if (!response.ok) throw new Error('Failed to fetch weather data');

        const data = await response.json();
        appState.currentWeatherData = data.current;
        appState.hourlyData = data.hourly;
        appState.dailyData = data.daily;
        appState.timezone = data.timezone;

        updateAllWeatherDisplay();
        showLoading(false);
        elements.mainContent.classList.add('active');
    } catch (error) {
        showError('Error fetching weather data. Please try again.');
        console.error('API error:', error);
        showLoading(false);
    }
}

// ==================== UPDATE DISPLAY ====================
function updateAllWeatherDisplay() {
    if (!appState.currentWeatherData) return;

    updateLocationInfo();
    updateCurrentWeather();
    updateDetailCards();
    updateHourlyForecast();
    updateDailyForecast();
}

function updateLocationInfo() {
    const { name, country } = appState.currentLocation;
    elements.locationName.textContent = country 
        ? `${name}, ${country}` 
        : name;
    updateCurrentDate();
}

function updateCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    elements.currentDate.textContent = now.toLocaleDateString('en-US', options);
}

function updateCurrentWeather() {
    const current = appState.currentWeatherData;
    const weather = WEATHER_CODES[current.weather_code];
    
    // Update temperature
    let temp = current.temperature_2m;
    if (appState.currentUnit === 'fahrenheit') {
        temp = (temp * 9/5) + 32;
    }
    elements.temperature.textContent = Math.round(temp);
    
    // Update feels like
    let feelsLike = current.apparent_temperature;
    if (appState.currentUnit === 'fahrenheit') {
        feelsLike = (feelsLike * 9/5) + 32;
    }
    elements.feelsLike.textContent = Math.round(feelsLike);
    
    // Update weather icon
    const isNight = isNightTime();
    elements.weatherIconLarge.textContent = isNight ? weather.icon_night : weather.icon_day;
    
    // Update condition
    elements.weatherCondition.textContent = weather.description;
}

function updateDetailCards() {
    const current = appState.currentWeatherData;
    const daily = appState.dailyData;
    
    elements.humidity.textContent = `${current.relative_humidity_2m}%`;
    
    let windSpeed = current.wind_speed_10m;
    if (appState.currentUnit === 'fahrenheit') {
        windSpeed = windSpeed * 0.621371; // km/h to mph
    }
    elements.windSpeed.textContent = `${Math.round(windSpeed)} ${appState.currentUnit === 'celsius' ? 'km/h' : 'mph'}`;
    
    elements.pressure.textContent = `${Math.round(current.pressure_msl)} hPa`;
    elements.uvIndex.textContent = Math.round(daily.uv_index_max[0]);
    elements.cloudCover.textContent = `${current.cloud_cover}%`;
    
    // Visibility - calculate from cloud cover
    const visibility = (100 - current.cloud_cover) * 0.1;
    elements.visibility.textContent = `${Math.round(visibility * 10)}  km`;
    
    // Sunrise and Sunset
    const sunrise = new Date(daily.sunrise[0]);
    const sunset = new Date(daily.sunset[0]);
    elements.sunrise.textContent = formatTime(sunrise);
    elements.sunset.textContent = formatTime(sunset);
}

function updateHourlyForecast() {
    const hourly = appState.hourlyData;
    const daily = appState.dailyData;
    const times = hourly.time;
    
    elements.hourlyForecast.innerHTML = '';
    
    // Show next 24 hours
    for (let i = 0; i < 24; i++) {
        const time = new Date(times[i]);
        const hour = time.getHours();
        const temp = hourly.temperature_2m[i];
        const weatherCode = hourly.weather_code[i];
        const rainChance = hourly.precipitation_probability[i];
        
        const weather = WEATHER_CODES[weatherCode];
        const isNight = hour >= 18 || hour < 6;
        const icon = isNight ? weather.icon_night : weather.icon_day;
        
        const card = document.createElement('div');
        card.className = 'hourly-card';
        if (i === 0) card.classList.add('current');
        
        let displayTemp = temp;
        if (appState.currentUnit === 'fahrenheit') {
            displayTemp = (temp * 9/5) + 32;
        }
        
        card.innerHTML = `
            <div class="hourly-time">${hour}:00</div>
            <div class="hourly-icon">${icon}</div>
            <div class="hourly-temp">${Math.round(displayTemp)}°</div>
            <div class="hourly-rain">${rainChance}%</div>
        `;
        
        elements.hourlyForecast.appendChild(card);
    }
}

function updateDailyForecast() {
    const daily = appState.dailyData;
    
    elements.dailyForecast.innerHTML = '';
    
    // Show next 5 days
    for (let i = 0; i < 5; i++) {
        const date = new Date(daily.time[i]);
        const dayName = i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const weather = WEATHER_CODES[daily.weather_code[i]];
        
        let tempMax = daily.temperature_2m_max[i];
        let tempMin = daily.temperature_2m_min[i];
        if (appState.currentUnit === 'fahrenheit') {
            tempMax = (tempMax * 9/5) + 32;
            tempMin = (tempMin * 9/5) + 32;
        }
        
        const card = document.createElement('div');
        card.className = 'daily-card';
        card.innerHTML = `
            <div class="daily-header">
                <div>
                    <div class="daily-day">${dayName}</div>
                    <div class="daily-date">${dateStr}</div>
                </div>
                <div class="daily-icon">${weather.icon_day}</div>
            </div>
            
            <div class="daily-temps">
                <div class="daily-temp">
                    <div class="temp-label">High</div>
                    <div class="temp-value">${Math.round(tempMax)}°</div>
                </div>
                <div class="daily-temp">
                    <div class="temp-label">Low</div>
                    <div class="temp-value">${Math.round(tempMin)}°</div>
                </div>
            </div>
            
            <div class="daily-condition">${weather.description}</div>
            
            <div class="daily-details">
                <div class="daily-detail-item">💧 ${daily.precipitation_sum[i] || 0} mm</div>
                <div class="daily-detail-item">💨 ${Math.round(daily.wind_speed_10m_max[i])} km/h</div>
            </div>
        `;
        
        elements.dailyForecast.appendChild(card);
    }
}

// ==================== UTILITY FUNCTIONS ====================
function isNightTime() {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function showLoading(show) {
    if (show) {
        elements.loading.classList.add('active');
        elements.mainContent.classList.remove('active');
    } else {
        elements.loading.classList.remove('active');
    }
}

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.classList.add('active');
    setTimeout(() => {
        elements.errorMessage.classList.remove('active');
    }, 5000);
}

function clearError() {
    elements.errorMessage.classList.remove('active');
}