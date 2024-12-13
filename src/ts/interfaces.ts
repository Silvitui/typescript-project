export interface DadJokeResponse {
    attachments: attachment[];
   
}
interface attachment {
    fallback: string
    footer: string
    text: string
}


export interface ChuckNorrisResponse {
    value: string;
}

export interface JokeVote {
    joke: string;
    score: number;
    date: string
};


export interface WeatherResponse {
    temperature: number;
    precipitation: number;
    [key: string]: any;
  }
  