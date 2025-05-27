document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const weatherData = document.getElementById("weather-data");
  const weatherIcon = document.getElementById("weather-icon");

  searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    
    if (!city) {
      weatherData.innerHTML = "<p>Por favor, ingresa una ciudad.</p>";
      return;
    }

    try {
      weatherData.innerHTML = "<p>Cargando...</p>";
      
      // Llama a TU API (reemplaza la URL con la de tu clima-api)
      const response = await fetch(`https://clima-api-17w0.onrender.com/=${city}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Muestra los datos (ajusta según la estructura de tu API)
      weatherData.innerHTML = `
        <p><strong>${data.ciudad}</strong></p>
        <p>Temperatura: ${data.temp}°C</p>
        <p>Humedad: ${data.humedad}%</p>
      `;
      
      // Cambia el ícono según el clima (opcional)
      weatherIcon.textContent = data.temp > 25 ? "☀️" : "🌤️";
      
    } catch (error) {
      console.error("Error al buscar el clima:", error);
      weatherData.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  });
});
