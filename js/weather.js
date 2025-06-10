document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const weatherData = document.getElementById("weather-data");
  const weatherIcon = document.getElementById("weather-icon");

  // Función para obtener clima y actualizar UI
  async function obtenerClimaPorCoords(lat, lon) {
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
    } catch (error) {
      weatherData.innerHTML = `<p class='error'>⚠️ Error: ${error.message}</p>`;
      console.error(error);
    }
  }

  // --- Intentar obtener ubicación por geolocalización ---
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        obtenerClimaPorCoords(lat, lon);
      },
      async (error) => {
        console.warn("Permiso denegado o error en geolocalización, intentando por IP...");
        // Si falla, usar la ubicación por IP
        const ipData = await obtenerUbicacionPorIP();
        if (ipData && ipData.loc) {
          const [lat, lon] = ipData.loc.split(',');
          obtenerClimaPorCoords(lat, lon);
        } else {
          console.warn("No se pudo obtener ubicación ni por IP ni por GPS.");
          // Aquí puedes dejar el UI para ingresar ciudad manualmente
        }
      }
    );
  } else {
    console.warn("Geolocalización no soportada, intentando por IP...");
    // Si no soporta geolocalización, usar IP directamente
    obtenerUbicacionPorIP().then(ipData => {
      if (ipData && ipData.loc) {
        const [lat, lon] = ipData.loc.split(',');
        obtenerClimaPorCoords(lat, lon);
      } else {
        console.warn("No se pudo obtener ubicación por IP.");
      }
    });
  }

  // Resto de tu código igual: búsqueda por ciudad manual y demás
  cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchBtn.click();
    }
  });

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
      weatherData.classList.remove("card-pop");
      void weatherData.offsetWidth;
      weatherData.classList.add("card-pop");

      weatherIcon.textContent = getWeatherIcon(data.clima);
    } catch (error) {
      weatherData.innerHTML = `
        <p class='error'>⚠️ Error: ${error.message}</p>
        <p>Intenta con otra ciudad o verifica tu conexión.</p>
      `;
      console.error("Error en la búsqueda:", error);
    }
  });

  // Función para íconos (igual que la tienes)
  function getWeatherIcon(climaDescripcion) {
    if (!climaDescripcion) return "🌈";
    const desc = climaDescripcion.toLowerCase();
    if (desc.includes("sol") || desc.includes("clear")) return "☀️";
    if (desc.includes("nubl") || desc.includes("cloud")) return "☁️";
    if (desc.includes("lluvia") || desc.includes("rain")) return "🌧️";
    if (desc.includes("nieve") || desc.includes("snow")) return "❄️";
    return "🌤️";
  }

  // Función para obtener ubicación por IP
  async function obtenerUbicacionPorIP() {
    try {
      const response = await fetch('https://ipinfo.io/json?token='); // Token opcional
      if (!response.ok) throw new Error('No se pudo obtener la ubicación por IP');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error obteniendo ubicación por IP:', error);
      return null;
    }
  }
});
