import React, { useCallback, useEffect, useState } from "react";
import { KEY, URL } from "../../helpers/config";

import styles from "./PlaceTable.module.css";

const PlaceTable = ({ coords }) => {
  const [weatherData, setWeatherData] = useState(
    JSON.parse(localStorage.getItem("wData")) || []
  );
  const [update, setUpdate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(async () => {
    setLoading(true);
    const resp = await fetch(
      `${URL}?lat=${+coords.latitude}&lon=${+coords.longitude}&appid=${KEY}&units=metric`
    );
    const data = await resp.json();
    console.log(weatherData);
    if (weatherData.filter((i) => i.id === data.id).length === 0) {
      weatherData.push(data);
      localStorage.setItem("wData", JSON.stringify(weatherData));
    }
    setUpdate(new Date());
    setWeatherData(weatherData);
    setLoading(false);
  }, [coords.latitude, coords.longitude, weatherData]);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
      setUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return <p>Loading....</p>;
  }

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

export default PlaceTable;
