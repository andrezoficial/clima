console.log("Ancho de pantalla:", window.innerWidth);

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const weatherData = document.getElementById("weather-data");
  const weatherIcon = document.getElementById("weather-icon");

  const fondosClima = {
    clear: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80",
    cloud: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1350&q=80",
    rain: "https://images.unsplash.com/photo-1527766833261-b09c3163a791?auto=format&fit=crop&w=1350&q=80",
    snow: "https://images.unsplash.com/photo-1602524813607-b174fc3b7922?auto=format&fit=crop&w=1350&q=80",
    default: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1350&q=80",
  };

  function updateBackground(climaDescripcion) {
    console.log("Descripción recibida:", climaDescripcion);
    if (!climaDescripcion) {
      document.body.style.backgroundImage = `url(${fondosClima.default})`;
      return;
    }

    const desc = climaDescripcion.toLowerCase();
    let fondoUrl = fondosClima.default;

    if (desc.includes("cielo claro") || desc.includes("clear") || desc.includes("soleado")) {
      fondoUrl = fondosClima.clear;
    } else if (
      desc.includes("nublado") ||
      desc.includes("muy nuboso") ||
      desc.includes("cloud") ||
      desc.includes("nubl")
    ) {
      fondoUrl = fondosClima.cloud;
    } else if (
      desc.includes("lluvia") ||
      desc.includes("lluvioso") ||
      desc.includes("rain")
    ) {
      fondoUrl = fondosClima.rain;
    } else if (
      desc.includes("nieve") ||
      desc.includes("nev") ||
      desc.includes("snow")
    ) {
      fondoUrl = fondosClima.snow;
    }

    document.body.style.backgroundImage = `url(${fondoUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.transition = "background-image 0.8s ease-in-out";
  }

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
          updateBackground(data.clima);

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
      console.log("Datos de la API:", data);

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
      updateBackground(data.clima);

    } catch (error) {
      weatherData.innerHTML = `
        <p class='error'>⚠️ Error: ${error.message}</p>
        <p>Intenta con otra ciudad o verifica tu conexión.</p>
      `;
      console.error("Error en la búsqueda:", error);
    }
  });

  function getWeatherIcon(climaDescripcion) {
    if (!climaDescripcion) return "🌈";
    const desc = climaDescripcion.toLowerCase();
    if (desc.includes("sol") || desc.includes("cielo claro") || desc.includes("clear")) return "☀️";
    if (desc.includes("nubl") || desc.includes("cloud")) return "☁️";
    if (desc.includes("lluvia") || desc.includes("rain")) return "🌧️";
    if (desc.includes("nieve") || desc.includes("snow")) return "❄️";
    return "🌤️";
  }
});

