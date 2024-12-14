import { DadJokeResponse } from './interfaces.js';

export const getDadJoke = async (): Promise<string> => {
    const response = await fetch('https://icanhazdadjoke.com/slack', {
        headers: {
            "Accept": "application/json"

        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch the Dad Joke");
    }

    const data: DadJokeResponse = await response.json();
    // console.log("Response dad joke :",data)
    const joke = data.attachments[0].text;
    return joke

}