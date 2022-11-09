import { createContext, useState, useEffect } from "react"
import { useGeolocated } from "react-geolocated";
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [notFind, setNotFind] = useState(false);
    const [isNight, setIsNight] = useState(false);

    const { coords } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

    useEffect(() => {
        const filterCity = async (filterData) => {
            try {
                setIsLoading(true)
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${filterData}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
                setWeather(response.data)
                setNotFind(false)
            } catch (error) {
                console.log(error.response.status)
                error.response.status === 404 && setNotFind(true)

            } finally {
                setIsLoading(false)
            }
        }
        filterText === '' ? getWeatherData() : filterCity(filterText);
    }, [filterText]);

    useEffect(() => {
        coords !== undefined && getWeatherData();
    }, [coords]);

    useEffect(() => {
        if (weather !== null) {
            const sunRise = new Date(weather.sys.sunrise * 1000).getHours();
            const sunSet = new Date(weather.sys.sunset * 1000).getHours();
            const now = new Date().getHours();
            (now < sunSet && now > sunRise) ? setIsNight(false) : setIsNight(true)
        }
    }, [weather]);

    const getWeatherData = async () => {
        try {
            const key = process.env.REACT_APP_WEATHER_API_KEY;
            const language = navigator.language.split("-")[0];
            const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}&lang=${language}&units=metric`);
            setWeather(weatherData.data);
            setNotFind(false)
            setNotFind(false);
            setIsLoading(false);
            console.log(weatherData);
        } catch (error) {
            console.log('error');
        }
    };

    const value = { weather, isLoading, setIsLoading, setWeather, getWeatherData, filterText, setFilterText, notFind, isNight };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}