console.log("Ancho de pantalla:", window.innerWidth);
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const weatherData = document.getElementById("weather-data");
  const weatherIcon = document.getElementById("weather-icon");

  weatherIcon.addEventListener("animationend", () => {
    weatherIcon.classList.remove("animate");
  });

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
      weatherIcon.classList.add("animate");

      // Cambia el fondo según el clima
      changeBackground(data.clima);

    } catch (error) {
      weatherData.innerHTML = `
        <p class='error'>⚠️ Error: ${error.message}</p>
        <p>Intenta con otra ciudad o verifica tu conexión.</p>
      `;
      weatherIcon.textContent = "❌";
    }
  });

  cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBtn.click();
    }
  });

  function getWeatherIcon(description) {
    const desc = description.toLowerCase();

    if (desc.includes("sunny") || desc.includes("soleado")) return "☀️";
    if (desc.includes("clear") || desc.includes("despejado")) return "🌕";
    if (desc.includes("cloudy") || desc.includes("nublado")) return "☁️";
    if (desc.includes("rain") || desc.includes("lluvia")) return "🌧️";
    if (desc.includes("storm") || desc.includes("tormenta")) return "⛈️";
    if (desc.includes("snow") || desc.includes("nieve")) return "❄️";
    if (desc.includes("fog") || desc.includes("niebla")) return "🌫️";
    if (desc.includes("wind") || desc.includes("viento")) return "💨";
    if (desc.includes("partly cloudy") || desc.includes("parcialmente nublado")) return "⛅";
    if (desc.includes("overcast") || desc.includes("cubierto")) return "🌥️";
    return "🌤️";
  }

  function changeBackground(description) {
    const desc = description.toLowerCase();

    if (desc.includes("sunny") || desc.includes("soleado")) {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80')";
    } else if (desc.includes("clear") || desc.includes("despejado")) {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80')";
    } else if (desc.includes("partly cloudy") || desc.includes("parcialmente nublado")) {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501621965065-c6e1cf6b53e2?auto=format&fit=crop&w=1400&q=80')";
    } else if (desc.includes("cloudy") || desc.includes("nublado")) {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1525164286255-1f2b5b1e3b6b?auto=format&fit=crop&w=1400&q=80')";
    } else if (desc.includes("overcast") || desc.includes("cubierto")) {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1474031317822-f51f48735ddd?auto=format&fit=crop&w=1400&q=80')";
    } else if (desc.includes("rain") || desc.includes("lluvia")) {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1561484930-998b6a7f5ca0?auto=format&fit=crop&w=1400&q=80')";
    } else if (desc.includes("thunder") || desc.includes("storm") || desc.includes("tormenta")) {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1500674425229-f692875b0ab7?auto=format&fit=crop&w=1400&q=80')";
    } else if (desc.includes("snow") || desc.includes("nieve")) {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1608889176798-2c4bc49c524b?auto=format&fit=crop&w=1400&q=80')";
    } else if (desc.includes("fog") || desc.includes("mist") || desc.includes("niebla")) {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1470115636492-6d2b56f2a7e1?auto=format&fit=crop&w=1400&q=80')";
    } else if (desc.includes("wind") || desc.includes("viento")) {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1525097487452-6278ff080c31?auto=format&fit=crop&w=1400&q=80')";
    } else {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1400&q=80')";
    }
  }
});
