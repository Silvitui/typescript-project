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

document.addEventListener("DOMContentLoaded", () => {
    const weatherEl = document.getElementById('weather-section');
    if (weatherEl) {
        const apiKey = "F6N1YLJq7T3UiyjO";
        const latitude = 41.3888;
        const longitude = 2.159;

        fetchWeather(latitude, longitude, apiKey)
            .then((data) => {
                if (data) {
                    let temperatureText = ''
                    let precipitationText = ''
                    // console.log(`Temperatura actual: ${data.data_day.temperature_mean[0]}°C`);
                    if (data.data_day.temperature_mean[0] < 15) {
                        temperatureText = `🥶Actual temp: ${data.data_day.temperature_mean[0]}°C `;
                    } else if (data.data_day.temperature_mean[0] >= 15 && data.data_day.temperature_mean[0] <= 20) {
                        temperatureText = `🙂🌤Actual temp: ${data.data_day.temperature_mean[0]}°C `
                    } else {
                        temperatureText = `🌞Actual temp: ${data.data_day.temperature_mean[0]}°C `
                    }
                    if (data.data_day.precipitation_probability[0] <= 30) {
                        precipitationText = `☔ Precipitation: ${data.data_day.precipitation_probability[0]} %`;
                    } else if (data.data_day.precipitation_probability[0] > 30 && data.data_day.precipitation_probability[0] <= 60) {
                        precipitationText = ` ☔Precipitation: ${data.data_day.precipitation_probability[0]} %`
                    } else {
                        precipitationText = `☔ Precipitation: ${data.data_day.precipitation_probability[0]} %`
                    }
                    weatherEl.textContent = temperatureText + precipitationText
                }
            })
            .catch((error) => {
                console.error(error)
                weatherEl.textContent = 'Error cargando datos meteorológicos';
            })
    }
    getRandomJoke();
    nextJokeBtn.addEventListener("click", () => {
        getRandomJoke();
    });


    score1Btn.addEventListener('click', () => voteJoke(1));
    score2Btn.addEventListener('click', () => voteJoke(2));
    score3Btn.addEventListener('click', () => voteJoke(3));
});