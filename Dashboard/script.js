function updateDateTime() {
    const now = new Date();
    document.getElementById("datetime").textContent = now.toLocaleString();
}
setInterval(updateDateTime, 1000);


async function fetchWeather() {
    const response = await fetch(`https://api.weather.com/v2/pws/observations/current?stationId=IVANDA46&format=json&units=e&apiKey=39cccb5b55f84b378ccb5b55f80b3730`);
    const data = await response.json();
    document.getElementById("weather").textContent = `${data.narrative}, ${data.temperature}°C`;
}
fetchWeather();



async function fetchQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    document.getElementById("quote").textContent = `"${data.content}" - ${data.author}`;
}
fetchQuote();

let map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

document.getElementById("locationSearch").addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        const searchText = e.target.value;
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`);
        const data = await response.json();
        if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;
            map.setView([lat, lon], 13);
            L.marker([lat, lon]).addTo(map);
        }
    }
});


async function fetchNews() {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY`);
    const data = await response.json();
    const newsList = document.getElementById("news");
    newsList.innerHTML = data.articles.map(article => `<li>${article.title}</li>`).join('');
}
fetchNews();

async function fetchTrendingTags() {
    const tags = ["#Tech", "#AI", "#ClimateChange", "#OpenAI", "#Coding", "#Startups"];
    const tagList = document.getElementById("trending-tags");
    tagList.innerHTML = tags.map(tag => `<li>${tag}</li>`).join('');
}
fetchTrendingTags();
