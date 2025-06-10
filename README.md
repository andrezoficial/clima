Clima Actual 🌤️

Clima Actual es una aplicación web sencilla que muestra el clima actual de cualquier ciudad o de tu ubicación automática, con un diseño moderno y dinámico que cambia el fondo según el clima.


Demo en Vivo
https://andrezoficial.github.io/clima/

Características
Búsqueda de clima por ciudad con resultados detallados: temperatura, descripción y humedad.


Detección automática de ubicación para mostrar el clima local.


Cambia dinámicamente la imagen de fondo según el estado del clima (sol, nublado, lluvia, nieve).


Íconos y animaciones para mejorar la experiencia visual.


Interfaz responsiva y accesible desde dispositivos móviles y escritorio.


Tecnologías
HTML5, CSS3 (Flexbox, animaciones)

JavaScript (Fetch API, DOM manipulation)

API externa de clima propia: clima-api-17w0.onrender.com

Instalación y uso
Clona el repositorio:

bash
Copiar
Editar
git clone https://github.com/andrezoficial/clima.git
Abre el archivo index.html en tu navegador o usa un servidor local:

bash
Copiar
Editar
# Usando Python 3
python -m http.server
Disfruta consultando el clima por ciudad o usa tu ubicación.

Estructura del proyecto
bash
Copiar
Editar
/clima
│
├── index.html          # Archivo principal HTML
├── js/
│   └── weather.js      # Lógica JavaScript para obtener y mostrar el clima
└── README.md           # Este archivo
API
La aplicación consume la API propia alojada en:

bash
Copiar
Editar
https://clima-api-17w0.onrender.com/clima
Parámetros:

ciudad: nombre de la ciudad para buscar clima.

lat y lon: coordenadas para obtener el clima de ubicación actual.

Ejemplo:

bash
Copiar
Editar
https://clima-api-17w0.onrender.com/clima?ciudad=Madrid
https://clima-api-17w0.onrender.com/clima?lat=40.4168&lon=-3.7038
Capturas
![Captura de pantalla 2025-06-09 215742](https://github.com/user-attachments/assets/2e3d80db-45b5-4ec8-8da0-4d76cd6c816d)
![image](https://github.com/user-attachments/assets/13835fed-8ebd-4d3f-a374-c4bf24d4bcd0)


Autor
Andrés Suárez Moreno
GitHub | LinkedIn

Licencia
Este proyecto está bajo la licencia MIT — consulta el archivo LICENSE para más detalles.

