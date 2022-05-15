import { useCallback, useEffect, useState } from "react";
import { KEY, URL } from "../../helpers/config";

import styles from "./PlaceTable.module.css";

export const PlaceTable = ({ coords }) => {
  const [weatherData, setWeatherData] = useState(
    JSON.parse(localStorage.getItem("wData")) || []
  );

  const [update, setUpdate] = useState(new Date());

  const fetchData = useCallback(async () => {
    const resp = await fetch(
      `${URL}?lat=${+coords.latitude}&lon=${+coords.longitude}&appid=${KEY}&units=metric`
    );
    if (!resp.ok) {
      throw new Error("Invalid request");
    }
    const data = await resp.json();

    if (weatherData.filter((i) => i.id === data.id).length === 0) {
      weatherData.push(data);
    } else {
      weatherData.map((i) => (i.id === data.id ? data : i));
    }

    setUpdate(new Date());
    setWeatherData(weatherData);
    localStorage.setItem(
      "wData",
      JSON.stringify(
        weatherData.filter((i) => i.coord.lat !== 0 && i.coord.lon !== 0)
      )
    );
  }, [coords.latitude, coords.longitude, weatherData]);

  useEffect(() => {
    fetchData().catch((err) => console.log(err.message));
    localStorage.setItem(
      "wData",
      JSON.stringify(
        weatherData.filter((i) => i.coord.lat !== 0 && i.coord.lon !== 0)
      )
    );
    const interval = setInterval(() => {
      fetchData().catch((err) => console.log(err.message));
      setUpdate(new Date());
      localStorage.setItem(
        "wData",
        JSON.stringify(
          weatherData.filter((i) => i.coord.lat !== 0 && i.coord.lon !== 0)
        )
      );
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchData, weatherData]);

  return (
    <div className={styles.container}>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead className={styles.table_head}>
            <tr>
              <th>Time</th>
              <th>Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Temperature</th>
              <th>Presure</th>
              <th>Humidity</th>
              <th>MIN Temperature</th>
              <th>MAX Temperature</th>
            </tr>
          </thead>
          <tbody className={styles.table_body}>
            {weatherData
              .filter((i) => i.coord.lat !== 0 && i.coord.lon !== 0)
              .map((place) => (
                <tr key={place.id}>
                  <td>
                    <span className={styles.table_id}>
                      {new Date(place.dt).toLocaleTimeString()}
                    </span>
                  </td>
                  <td>
                    <span className={styles.table_fullname}>{place.name}</span>
                  </td>
                  <td>
                    <span className={styles.table_id}>{place.coord.lat}</span>
                  </td>
                  <td>
                    <span className={styles.table_id}>{place.coord.lon}</span>
                  </td>
                  <td>
                    <div className={styles.table_actions}>
                      {place.main.temp}
                    </div>
                  </td>
                  <td>
                    <div className={styles.table_actions}>
                      {place.main.pressure}
                    </div>
                  </td>
                  <td>
                    <div className={styles.table_actions}>
                      {place.main.humidity}
                    </div>
                  </td>
                  <td>
                    <div className={styles.table_actions}>
                      {place.main.temp_min}
                    </div>
                  </td>
                  <td>
                    <div className={styles.table_actions}>
                      {place.main.temp_max}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>last updated {update.toLocaleTimeString()}</div>
    </div>
  );
};
