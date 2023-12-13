// Estación meteorológica:
// ¿Como funciona?
// Crea una página que tendrá lo siguiente:

// El tiempo en el momento en el que accedemos a la página con varios elementos:
// Ciudad y Pais. Pondremos la ciudad y País en el que nos encontramos.
// El estado del clima.
// Imagen y grados celsius de nuestra ciudad.
// Precipitaciones, humedad y viento km/h.
// La previsión por horas en el día en el que estamos. Con su hora, imagen y grados celsius.
// Dale estilo con CSS.
// ¿Qué usaremos?
// API del tiempo de https://www.weatherapi.com/
// Necesitarás una API KEY. Podrás conseguirla entrando en la url de weatherapi y pulsando en signup. Rellena los datos que pide y nada más entrar os aparecerá esa API KEY.
// Puedes probar que funciona en esta página: https://www.weatherapi.com/api-explorer.aspx metiendo la APIKEY y dándole al botón de show response
// Aquí está la documentación completa https://www.weatherapi.com/docs/
// Este es el base URL al que tendréis que acceder http://api.weatherapi.com/v1 añadiremos detrás lo que necesitemos.
// Este es un ejemplo de endpoint con la APIKEY y la ciudad. Solo habría que cambiar los datos de ${apiKey} por la nuestra y ${ciudad} por la elegida por nosotros https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no
// fetch para hacer peticiones a la API.
// PISTAS Y CONSEJOS
// La URL base es http cámbiala desde el inicio por https para no tener problemas en el futuro de bloqueos de seguridad.
// Usa promesas o ASYNC/AWAIT para crear la asincronía en las peticiopnes fetch
// Piensa si necesitas solo un endpoint o varios. Revisa que trae cada petición.
// Estructura bien tu código

// Temperature: current > temp_c
// Feels like: current > feelslike_c
// Humidity: current > humidity
// Wind: current > wind_kph
// Image: current > condition > icon

// Sunrise: forecast > 0 > astro > sunrise
// Sunset: forecast > 0 > astro > sunset

// City: location > name
// Country: location > country

const apiKey = "7317477b37ea40df8f8195024231312";
const searchInput = document.querySelector(".weatherSearch input");
const searchBtn = document.querySelector(".weatherSearch button");
const city = "";
const weatherIcon = document.querySelector(".weatherIcon");

const fetchWeather = async () => {

    const city = searchInput.value;

    searchBtn.addEventListener("click", () => {
        fetchWeather(searchInput.value);
    });

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            fetchWeather(searchInput.value)
        }
    });

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no`);
        
        const data = await response.json();
        // console.log(data);

        document.querySelector(".city").innerHTML = data.location.name + ", " + data.location.country;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "ºC";
        document.querySelector(".feel").innerHTML = "Feels like: " + Math.round(data.current.feelslike_c) + "ºC";
        document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
        document.querySelector(".wind").innerHTML = data.current.wind_kph + "km/h";
        weatherIcon.src = "https://" + data.current.condition.icon
        console.log(data.current.condition.icon)
        document.querySelector(".weather").style.display = "block"

    } catch (error) {
        // console.log(error);
    }

};

fetchWeather()

