document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const cityInput = document.getElementById("city-input");
    const weatherData = document.getElementById("weather-data");
    const weatherIcon = document.getElementById("weather-icon");

    searchBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        
        if (!city) {
            weatherData.innerHTML = "<p class='error'>🔍 Ingresa una ciudad</p>";
            return;
        }

        try {
            weatherData.innerHTML = "<p class='loading'>⏳ Buscando clima...</p>";
            
            // Llamada a TU API Flask
            const response = await fetch(`https://clima-api-17w0.onrender.com/clima?ciudad=${encodeURIComponent(city)}`);
            
            if (!response.ok) throw new Error(`Error ${response.status}: Ciudad no encontrada`);
            
            const data = await response.json();
            console.log("API response:", data);

            // Renderizado con íconos
            weatherData.innerHTML = `
                <p class="temp">${data.temperatura}°C</p>
                <p class="humedad">${data.humedad}%</p>
                <p class="clima">${data.clima}</p>
            `;

            // Ícono dinámico
            weatherIcon.textContent = getWeatherIcon(data.clima);

        } catch (error) {
            weatherData.innerHTML = `<p class='error'>⚠️ ${error.message}</p>`;
            console.error("Fetch error:", error);
        }
    });

    // Mapeo de íconos
    function getWeatherIcon(climaDesc) {
        const desc = climaDesc.toLowerCase();
        if (desc.includes("sol")) return "☀️";
        if (desc.includes("nubl")) return "☁️";
        if (desc.includes("lluvia")) return "🌧️";
        if (desc.includes("nieve")) return "❄️";
        return "🌤️";
    }
});
