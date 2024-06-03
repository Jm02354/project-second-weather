import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
const key = "9b0f21338e4342bfd05fde70f6067e36";

function App() {
  const [weather, setWeather] = useState();
  const [coords, setCoords] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const success = (pos) => {
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const { lat, lon } = coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
      axios
        .get(url)
        .then((res) => {
          const kel = res.data.main.temp;
          const cel = (kel - 273.15).toFixed(2);
          const fah = ((cel * 9) / 5 + 32).toFixed(2);
          setTemp({ cel: cel, fah: fah });
          setWeather(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
        });
    }
  }, [coords]);

  console.log(weather);

  return (
    <div className="app">
      {isLoading ? (
        <figure className="app__img">
          <img
            src="https://cdn.dribbble.com/users/2050912/screenshots/5773097/loading.gif"
            alt="is loading"
          />
        </figure>
      ) : (
        <WeatherCard weather={weather} temp={temp} />
      )}
    </div>
  );
}

export default App;
