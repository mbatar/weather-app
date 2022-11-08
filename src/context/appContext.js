import { createContext, useState, useEffect } from "react"
import { useGeolocated } from "react-geolocated";
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const { coords } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

    const getWeatherData = async (latitude, longitude) => {
        try {
            const key = process.env.REACT_APP_WEATHER_API_KEY;
            const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`);
            setWeather(weatherData.data);
            console.log(weatherData)
        } catch (error) {
            console.log('error');
        }
    };

    useEffect(() => {
        coords !== undefined && getWeatherData(coords.latitude, coords.longitude);
    }, [coords]);

    const value = { weather, isLoading, setIsLoading };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}