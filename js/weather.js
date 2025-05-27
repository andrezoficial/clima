document.getElementById("search-btn").addEventListener("click", async () => {
  const city = document.getElementById("city-input").value.trim();
  const weatherData = document.getElementById("weather-data");

  if (!city) {
    weatherData.innerHTML = "<p>Ingresa una ciudad</p>";
    return;
  }

  try {
    weatherData.innerHTML = "<p>Cargando...</p>";
    
    // Llama a TU API (¡usa tu URL exacta!)
    const response = await fetch(`https://clima-api-17w0.onrender.com/clima?ciudad=${city}`);
    
    if (!response.ok) throw new Error("Ciudad no encontrada");
    const data = await response.json();

    // Muestra los datos (ajusta según el JSON de tu API)
    weatherData.innerHTML = `
      <p><strong>${data.ciudad}</strong></p>
      <p>Temperatura: ${data.temp}°C</p>
      <p>Humedad: ${data.humedad}%</p>
    `;

  } catch (error) {
    weatherData.innerHTML = `<p>Error: ${error.message}</p>`;
    console.error("Error al buscar clima:", error);
  }
  const cors = require("cors");
app.use(cors()); // Habilita CORS para todas las rutas
});
