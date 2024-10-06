// Initialize map centered on Bangalore
const map = L.map('map').setView([12.9716, 77.5946], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to highlight place and get temperature
async function highlightPlace() {
    const placeName = document.getElementById('place-input').value;

    // Use Nominatim API to get coordinates for the place name
    const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${placeName}, Bangalore`);
    const geoData = await geoResponse.json();

    if (geoData.length > 0) {
        const { lat, lon, display_name } = geoData[0];

        // Add marker to map
        const marker = L.marker([lat, lon]).addTo(map);
        map.setView([lat, lon], 14);

        // Fetch weather data from OpenWeather
        const apiKey = 'your_openweather_api_key';  // Replace with your OpenWeather API key
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const weatherData = await weatherResponse.json();

        const temperature = weatherData.main.temp;
        document.getElementById('temperature').innerHTML = `Temperature in ${display_name}: ${temperature}°C`;
    } else {
        alert('Place not found');
    }
}
