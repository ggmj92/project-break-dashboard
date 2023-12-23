// //NAV BAR

// const navLinks = document.querySelectorAll(".navBar a");

// navLinks.forEach(link => {
//     link.addEventListener('click', function (event) {
//         event.preventDefault();

//         const widgets = document.document.querySelectorAll('.widget');
//         widgets.forEach(widget => {
//             widget.style.display = "none";
//         });

//         const widgetId = link.getAttribute("data-widget");
//         document.querySelector("#" + widgetId).style.display = "block";
//     });
// });

//CLOCK WIDGET

const currentTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();

    hours = (hours < 10) ? "0" + hours : hours;
    mins = (mins < 10) ? "0" + mins : mins;
    secs = (secs < 10) ? "0" + secs : secs;

    let hour = `${hours}:${mins}:${secs}`;

    document.getElementsByClassName("time")[0].innerHTML = hour;
    let clock = setTimeout(function () { currentTime() }, 1000);

    updateText(hour);
}

const currentDate = () => {
    let date = new Date();
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();

    let today = `${day}/${month}/${year}`

    document.getElementsByClassName("date")[0].innerHTML = today;

}

const updateText = (hour) => {
    let string = "";
    const text = document.querySelector(".text p");

    const timeRanges = {
        rest: ["00:01", "07:00"],
        morning: ["07:01", "12:00"],
        lunch: ["12:01", "14:00"],
        afternoon: ["14:01", "16:00"],
        push: ["16:01", "18:00"],
        overtime: ["18:01", "22:00"],
        night: ["22:01", "00:00"]
    };

    for (const range of Object.values(timeRanges)) {
        if (hour >= range[0] && hour < range[1]) {
            string = messageForRange(range);
        }
    }

    if (!string) {
        string = "| Have a good night! |"
    }

    text.innerHTML = string.split("").map(
        (char, i) =>
            `<span style="transform:rotate(${i * 10}deg)">${char}</span>`

    ).join("")
};

const messageForRange = (range) => {
    switch (range[0]) {
        case "00:01":
            return "| Shut off and continue tomorrow! |";
        case "07:01":
            return "| Good morning! |"
        case "12:01":
            return "| Don't forget to eat! |"
        case "14:01":
            return "| Hope you had a nice lunch! |"
        case "16:01":
            return "| Good afternoon! |"
        case "18:01":
            return "| Consider stopping soon! |"
        case "22:01":
            return "| Goodnight, get some rest! |"
        default:
            return "";
    }
};

currentTime();
currentDate();


//WEATHER WIDGET

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

    let city = localStorage.getItem("city");
    if (!city) {
        city = searchInput.value;
    }

    searchBtn.addEventListener("click", () => {
        city = searchInput.value;
        localStorage.setItem("city", city);
        fetchWeather();
    });

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            city = searchInput.value;
            localStorage.setItem("city", city);
            fetchWeather();
        }
    });

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no`);

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.location.name + ", " + data.location.country;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "ºC";
        document.querySelector(".feel").innerHTML = "Feels like: " + Math.round(data.current.feelslike_c) + "ºC";
        document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
        document.querySelector(".wind").innerHTML = data.current.wind_kph + "km/h";
        weatherIcon.src = "https://" + data.current.condition.icon;

        const hourlyWeather = document.querySelector(".hourlyWeather");
        hourlyWeather.innerHTML = "";

        let counter = [0];
        data.forecast.forecastday[0].hour.forEach(hourData => {
            if (counter < 6) {
                const hourElement = document.createElement("div");
                const time = hourData.time.split(" ")[1];

                hourElement.innerHTML = `
            <h3>${time}</h3>
            <p>${Math.round(hourData.temp_c)}ºC</p>
            <img src="https://${hourData.condition.icon}" alt="${hourData.condition.text}">
            `;
                hourlyWeather.appendChild(hourElement);
                counter++;
            }
        });

        document.querySelector(".weather").style.display = "block";

    } catch (error) {
    }

};

fetchWeather();

//FAVORITE LINKS WIDGET

const linkList = document.getElementById("link-list");
const addLinkBtn = document.getElementById("add-link-btn");
const linkTitle = document.getElementById("link-title");
const linkUrl = document.getElementById("link-url");

const addLink = (title, url) => {
    const listItem = document.createElement("li");
    listItem.classList.add("link-item");

    // if (!url.startsWith("http")) {
    //     url = "https://www." + url;
    // }

    const linkElement = document.createElement("a");
    linkElement.href = url;
    linkElement.textContent = title;
    listItem.appendChild(linkElement);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", () => {
        linkList.removeChild(listItem);
        updateLocalStorage();
    });
    listItem.appendChild(deleteBtn);

    linkList.appendChild(listItem)
    updateLocalStorage();
}

addLinkBtn.addEventListener('click', () => {
    const title = linkTitle.value.trim();
    const url = linkUrl.value.trim();

    if (!title || !url) {
        alert('Please enter both title and url');
        return
    }

    try {
        new URL(url);
    } catch (_) {
        alert('Please enter a valid url');
        return
    }

    addLink(title, url);

    linkTitle.value = "";
    linkUrl.value = "";
});


const getLinksFromLocalStorage = () => {
    try {
        return JSON.parse(localStorage.getItem("favoriteLinks") || "[]");
    } catch (error) {
        console.error("Error reading from localStorage", error);
        return [];
    }
}


const updateLocalStorage = () => {
    const links = [];
    for (const item of linkList.querySelectorAll("li")) {
        links.push({
            title: item.querySelector("a").textContent,
            url: item.querySelector("a").href
        })
    }
    try {
        localStorage.setItem("favoriteLinks", JSON.stringify(links))
    } catch (error) {
        console.error("Error writing to localStorage", error)
    }

};

document.addEventListener("DOMContentLoaded", () => {
    getLinksFromLocalStorage().forEach((link) => addLink(link.title, link.url))
})


//BACKGROUND IMAGES

const images = [
    './assets/img/1.jpg',
    './assets/img/2.jpg',
    './assets/img/3.jpg',
    './assets/img/4.jpg',
    './assets/img/5.jpg',
    './assets/img/6.jpg',
    './assets/img/7.jpg',
    './assets/img/8.jpg',
    './assets/img/9.jpg',
    './assets/img/10.jpg'
];

const changeBackgroundImage = () => {
    const randomImage = Math.floor(Math.random() * images.length);
    const imageUrl = images[randomImage];
    document.body.style.backgroundImage = `url('${imageUrl}')`;
}

setInterval(changeBackgroundImage, 15000);

changeBackgroundImage();


//PASSWORD GENERATOR WIDGET

document.getElementById('generateBtn').addEventListener('click', () => {
    const length = document.getElementById('passwordLength').value;
    let result = "";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_=+";
    const allCharacters = uppercase + lowercase + numbers + symbols;

    result += uppercase[Math.floor(Math.random() * uppercase.length)];
    result += lowercase[Math.floor(Math.random() * lowercase.length)];
    result += numbers[Math.floor(Math.random() * numbers.length)];
    result += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < length; i++) {
        result += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    result = result.split('').sort(() => Math.random() - 0.5).join('');

    document.getElementById("password").value = result;
});

