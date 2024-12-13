import { ChuckNorrisResponse } from "./interfaces.js";

export const getChuckNorrisJoke = async (): Promise<string> => {
    const response = await fetch("https://api.chucknorris.io/jokes/random", {
        headers: {
            "Accept": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch the Chuck Norris joke");
    }

    const data: ChuckNorrisResponse = await response.json();
    console.log("Response Chuck Norris:",data)
    return data.value;
};