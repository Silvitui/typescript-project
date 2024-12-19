import { getDadJoke } from './dadJokes.js';
import { getChuckNorrisJoke } from './chuckNorris.js';
import { fetchWeather } from './weather.js';
import { JokeVote } from './interfaces.js';

const domShowJoke = document.getElementById("showJoke") as HTMLDivElement;
const nextJokeBtn = document.getElementById("button") as HTMLButtonElement;
const score1Btn = document.getElementById("score1") as HTMLButtonElement;
const score2Btn = document.getElementById("score2") as HTMLButtonElement;
const score3Btn = document.getElementById("score3") as HTMLButtonElement;

if (!domShowJoke || !nextJokeBtn || !score1Btn || !score2Btn || !score3Btn) {
    console.error("Missing Dom elements")
    throw new Error("Missing Dom elements")
}

let currentJoke: string = '';
let reportJokes: JokeVote[] = [];

const getRandomJoke = async (): Promise<void> => {
    try {
        const jokes = [getDadJoke, getChuckNorrisJoke];
        const randomIndex = Math.floor(Math.random() * jokes.length);
        currentJoke = await jokes[randomIndex]();
        domShowJoke.textContent = currentJoke;

    } catch (error) {
        console.error(error);
        domShowJoke.textContent = "Ups! There was an error loading the joke";
    }
};


const voteJoke = async (score: number): Promise<void> => {
    const index = reportJokes.findIndex(report => report.joke === currentJoke);

    if (index !== -1) {
        reportJokes = reportJokes.map((report, index) =>
            index === index ? { ...report, score, date: new Date().toISOString() } : report
        );
    } else {
        const newVote: JokeVote = {
            joke: currentJoke,
            score: score,
            date: new Date().toISOString()
        };
        console.log('Joke score:', newVote.score);
        reportJokes.push(newVote);
    }

};

const LATITUDE = 41.3888;
const LONGITUDE = 2.159;
const API_KEY = "F6N1YLJq7T3UiyjO";

const getWeather = async (): Promise<void> => {
    const weatherEl = document.getElementById("weather-section");
    if (!weatherEl) {
        console.error("Missing DOM elements.");
        return;
    }

    try {
        const data = await fetchWeather(LATITUDE, LONGITUDE, API_KEY);
        if (data) {
            const weatherText = generateWeatherText(data);
            weatherEl.textContent = weatherText;
        } else {
            weatherEl.textContent = "Error loading weather information.";
        }
    } catch (error) {
        console.error("Error loading weather data:", error);
        weatherEl.textContent = "Error loading weather data.";
    }
};

const generateWeatherText = (data: any): string => {
    let temperatureText = "";
    let precipitationText = "";

    const temp = data.data_day.temperature_mean[0];
    const precipitation = data.data_day.precipitation_probability[0];

    if (temp < 15) {
        temperatureText = `🥶 Actual temp: ${temp}°C `;
    } else if (temp >= 15 && temp <= 20) {
        temperatureText = `🙂🌤 Actual temp: ${temp}°C `;
    } else {
        temperatureText = `🌞 Actual temp: ${temp}°C `;
    }

    if (precipitation <= 30) {
        precipitationText = `☔ Precipitation: ${precipitation}%`;
    } else if (precipitation > 30 && precipitation <= 60) {
        precipitationText = `☔ Precipitation: ${precipitation}%`;
    } else {
        precipitationText = `☔ Precipitation: ${precipitation}%`;
    }

    return temperatureText + precipitationText;
};




document.addEventListener("DOMContentLoaded", () => {
    getWeather(); 

    getRandomJoke(); 
    nextJokeBtn.addEventListener("click", getRandomJoke);

    score1Btn.addEventListener('click', () => voteJoke(1));
    score2Btn.addEventListener('click', () => voteJoke(2));
    score3Btn.addEventListener('click', () => voteJoke(3));
});
