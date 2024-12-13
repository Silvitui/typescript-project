import { WeatherResponse } from "./interfaces.js";


  export const fetchWeather = async (latitude: number, longitude: number, apiKey: string): Promise<WeatherResponse | null> => {
    const baseURL = "https://my.meteoblue.com/packages";
    const packageType = "basic-day"; 
    const format = "json";
    const lang = "es"; 
  
    const url = `${baseURL}/${packageType}?lat=${latitude}&lon=${longitude}&apikey=${apiKey}&format=${format}&lang=${lang}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error al obtener datos meteorológicos: ${response.status}`);
      }
  
      const data: WeatherResponse = await response.json();
      console.log("Datos del clima:", data);
      return data;
    } catch (error) {
      console.error("Error en la llamada a la API de meteoblue:", error);
      return null;
    }
  };
 