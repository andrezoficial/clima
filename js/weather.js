// weather.js - Código corregido para integrar con tu API del clima

document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const weatherData = document.getElementById("weather-data");
  const weatherIcon = document.getElementById("weather-icon");

  // Evento al hacer clic en buscar
  searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    
    // Validación básica
    if (!city) {
      weatherData.innerHTML = "<p class='error'>Por favor, ingresa una ciudad</p>";
      return;
    }

    try {
      // Mensaje de carga
      weatherData.innerHTML = "<p class='loading'>Buscando datos climáticos...</p>";
      
      // 1. FETCH A TU API (¡URL CORRECTA!)
      const response = await fetch(`https://clima-api-17w0.onrender.com/clima?ciudad=${encodeURIComponent(city)}`);
      
      // 2. MANEJO DE ERRORES HTTP
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Error ${response.status}: ${response.statusText}`);
      }

      // 3. PROCESAR RESPUESTA (verifica la estructura de tu API)
      const data = await response.json();
      console.log("Datos recibidos:", data); // Depuración

      // 4. RENDERIZADO (ajusta según tu estructura de datos real)
      weatherData.innerHTML = `
        <div class="weather-result">
          <h3>${data.ciudad || data.city || "Ciudad no disponible"}</h3>
          <p>🌡️ Temperatura: ${data.temp || data.temperature || "N/A"}°C</p>
          <p>💧 Humedad: ${data.humedad || data.humidity || "N/A"}%</p>
        </div>
      `;

      // 5. CAMBIO DE ÍCONO (opcional)
      const temp = data.temp || data.temperature;
      weatherIcon.textContent = temp > 25 ? "☀️" : temp > 15 ? "⛅" : "❄️";

    } catch (error) {
      // 6. MANEJO DE ERRORES
      console.error("Error en la búsqueda:", error);
      weatherData.innerHTML = `
        <p class='error'>⚠️ Error: ${error.message || "No se pudo obtener el clima"}</p>
        <p>Intenta con otra ciudad o verifica la conexión.</p>
      `;
    }
  });
});
