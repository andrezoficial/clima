document.getElementById('search-btn').addEventListener('click', fetchWeather);

async function fetchWeather() {
  const city = document.getElementById('city-input').value.trim();
  if (!city) return;

  try {
    const response = await fetch(`https://clima-api-17w0.onrender.com/clima?ciudad=${encodeURIComponent(city)}`);
    const data = await response.json();

    if (data.error) {
      document.getElementById('weather-data').innerHTML = `<p>${data.error}</p>`;
    } else {
      updateWeatherUI(data);
    }
  } catch (error) {
    document.getElementById('weather-data').innerHTML = '<p>Error al conectar con el servicio</p>';
  }
}

function updateWeatherUI(data) {
  const icon = document.getElementById('weather-icon');
  const weatherDiv = document.getElementById('weather-data');

  // Selecciona icono según el clima
  const weather = data.clima.toLowerCase();
  if (weather.includes('sol')) icon.textContent = '☀️';
  else if (weather.includes('lluvia')) icon.textContent = '🌧️';
  else if (weather.includes('nube')) icon.textContent = '☁️';
  else icon.textContent = '🌤️';

  weatherDiv.innerHTML = `
    <p><strong>${data.ciudad}</strong></p>
    <p>🌡️ ${data.temperatura}°C</p>
    <p>💧 ${data.humedad}% humedad</p>
    <p>🌬️ ${data.viento || 'N/A'} km/h</p>
  `;
}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://tu-api.com/clima?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
      .then(...)
  });
}
