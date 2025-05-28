document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const weatherData = document.getElementById("weather-data");
  const weatherIcon = document.getElementById("weather-icon");

  searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    
    if (!city) {
      weatherData.innerHTML = "<p class='error'>🔍 Por favor, ingresa una ciudad</p>";
      return;
    }

    try {
      weatherData.innerHTML = "<p class='loading'>⏳ Buscando datos climáticos...</p>";
      
      // Llama a TU API Flask
      const response = await fetch(`https://clima-api-17w0.onrender.com/clima?ciudad=${encodeURIComponent(city)}`);
      
      if (!response.ok) throw new Error(`Error ${response.status}: Ciudad no encontrada`);
      
      const data = await response.json();
      console.log("Datos de la API:", data); // Para depuración

      // Renderiza TODOS los campos disponibles
      weatherData.innerHTML = `
        <div class="weather-card">
          <h2>${data.ciudad || "Ciudad no disponible"}</h2>
          <div class="weather-main">
            <span class="temp">🌡️ ${data.temperatura}°C</span>
            <span class="desc">${data.clima || ""}</span>
          </div>
          <div class="weather-details">
            <p>💧 Humedad: ${data.humedad}%</p>
          </div>
        </div>
      `;

      // Cambia el ícono según el clima (personalizable)
      weatherIcon.textContent = getWeatherIcon(data.clima);

    } catch (error) {
      weatherData.innerHTML = `
        <p class='error'>⚠️ Error: ${error.message}</p>
        <p>Intenta con otra ciudad o verifica tu conexión.</p>
      `;
      console.error("Error en la búsqueda:", error);
    }
  });

  // Función para íconos dinámicos (basada en la descripción del clima)
  function getWeatherIcon(climaDescripcion) {
    if (!climaDescripcion) return "🌈";
    const desc = climaDescripcion.toLowerCase();
    if (desc.includes("sol") || desc.includes("clear")) return "☀️";
    if (desc.includes("nubl") || desc.includes("cloud")) return "☁️";
    if (desc.includes("lluvia") || desc.includes("rain")) return "🌧️";
    if (desc.includes("nieve") || desc.includes("snow")) return "❄️";
    return "🌤️";
  }
});
