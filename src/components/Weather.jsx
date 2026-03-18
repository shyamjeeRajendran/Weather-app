import { useState } from "react";
import axios from "axios";

function Weather() {
  let [city, setCity] = useState("");
  let [data, setData] = useState({});
  let [error, setError] = useState("");

  let apiKey = import.meta.env.VITE_API_KEY;

  const getWeather = async () => {
    try {
      let geoCoder = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`,
      );

      let { lat, lon } = geoCoder.data[0];

      let weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
      );
      setData(weatherData.data);
    } catch (err) {
      setError("city not found");
      setData({});
      console.log("Error:", err);
    }
    setCity("");
  };
  return (
    <div className="bg-green-400 p-2 m-5 border rounded-xl md:p-10 md:m-20">
      <h1 className="text-3xl font-bold">Weather Report:</h1>
      <p>I can give you a weather report about your city !</p>
      {error && <p className="text-red-600">{error}</p>}
      <div className=" flex flex-col gap-5 md:flex-row flex-wrap mt-5 md:gap-20">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter your cityname"
            className="bg-amber-50 rounded-sm p-1"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="bg-black text-amber-50 p-1 rounded-sm"
            onClick={getWeather}
          >
            search
          </button>
        </div>
        <div className="flex  flex-col flex-1">
          <div>
            <h2 className="text-xl underline">REPORT</h2>
          </div>
          <div className="flex flex-col md:flex-row md:gap-20">
            <div>
              <p className="font-bold">City: {data.name}</p>
              <p className="font-bold">Weather: {data.weather?.[0]?.main}</p>
            </div>
            <div>
              <p className="font-bold">
                Description: {data.weather?.[0]?.description}
              </p>
              <p className="font-bold">Temperature: {data.main?.temp}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Weather;
