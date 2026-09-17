const API_KEY = "original openweather API";

async function getWeather() {

    const city = document.getElementById("cityInput").value;

    const errorMessage = document.getElementById("errorMessage");

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("cityName").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)} °C`;

        document.getElementById("description").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            data.main.humidity;

        document.getElementById("wind").textContent =
            data.wind.speed;

        errorMessage.textContent = "";

       
        const condition = data.weather[0].main;

        let icon = "🌤️";

        if (condition === "Clear") {
            icon = "☀️";
        } 
        else if (condition === "Clouds") {
            icon = "☁️";
        } 
        else if (condition === "Rain") {
            icon = "🌧️";
        } 
        else if (condition === "Thunderstorm") {
            icon = "⛈️";
        } 
        else if (condition === "Snow") {
            icon = "❄️";
        } 
        else if (condition === "Mist" || condition === "Fog") {
            icon = "🌫️";
        }

        document.getElementById("weatherIcon").textContent = icon;

    } 
    catch (error) {

        errorMessage.textContent =
            "❌ City not found. Please enter a valid city.";

    }
}