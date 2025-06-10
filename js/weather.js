console.log("Ancho de pantalla:", window.innerWidth);

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const weatherData = document.getElementById("weather-data");
  const weatherIcon = document.getElementById("weather-icon");
  document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const weatherData = document.getElementById("weather-data");
  const weatherIcon = document.getElementById("weather-icon");

  // --- Aquí agregamos la detección automática de ubicación ---
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        weatherData.innerHTML = "<p class='loading'>⏳ Obteniendo clima de tu ubicación...</p>";

        try {
          const response = await fetch(`https://clima-api-17w0.onrender.com/clima?lat=${lat}&lon=${lon}`);
          if (!response.ok) throw new Error(`Error ${response.status}: No se pudo obtener el clima`);

          const data = await response.json();

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

          weatherIcon.textContent = getWeatherIcon(data.clima);

          // Si tienes función para cambiar fondo según clima, la llamas aquí
          // updateBackground(data.clima);

        } catch (error) {
          weatherData.innerHTML = `<p class='error'>⚠️ Error: ${error.message}</p>`;
          console.error(error);
        }
      },
      (error) => {
        console.log("Ubicación no disponible o permiso denegado:", error.message);
      }
    );
  } else {
    console.log("Geolocalización no soportada por este navegador");
  }

  // 🔎 Permite usar Enter para buscar
  cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchBtn.click();
    }
  });

  // 🔄 Evento click para buscar clima
  searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    if (!city) {
      weatherData.innerHTML = "<p class='error'>🔍 Por favor, ingresa una ciudad</p>";
      return;
    }

    try {
      weatherData.innerHTML = "<p class='loading'>⏳ Buscando datos climáticos...</p>";

      const response = await fetch(`https://clima-api-17w0.onrender.com/clima?ciudad=${encodeURIComponent(city)}`);
      if (!response.ok) throw new Error(`Error ${response.status}: Ciudad no encontrada`);

      const data = await response.json();
      console.log("Datos de la API:", data);

      // 🧊 Actualiza contenido
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

      // ✨ Aplica animación
      weatherData.classList.remove("card-pop");
      void weatherData.offsetWidth; // Fuerza reflow
      weatherData.classList.add("card-pop");

      // ☀️ Ícono dinámico
      weatherIcon.textContent = getWeatherIcon(data.clima);

    } catch (error) {
      weatherData.innerHTML = `
        <p class='error'>⚠️ Error: ${error.message}</p>
        <p>Intenta con otra ciudad o verifica tu conexión.</p>
      `;
      console.error("Error en la búsqueda:", error);
    }
  });

  // 🔁 Función para íconos
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
