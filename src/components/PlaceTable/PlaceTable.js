import React, { useEffect, useState } from "react";
import { KEY, URL } from "../../helpers/config";

import styles from "./PlaceTable.module.css";

const PlaceTable = ({ coords }) => {
  console.log(coords);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const timer = setInterval(
      () =>
        fetch(
          `${URL}?lat=${+coords.latitude}&lon=${+coords.longitude}&appid=${KEY}&units=metric`
        )
          .then((resp) => resp.json())
          .then((data) => {
            const wData = [];
            wData.push(data);

            setWeatherData(wData);
            setLoading(false);
            console.log(data);
          }),
      30000000
    );
    return () => {
      clearInterval(timer);
    };
  }, [coords.latitude, coords.longitude]);

  if (loading) {
    return <p>Loading....</p>;
  }
  return (
    <div>
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
            {weatherData.map((place) => (
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
                  <div className={styles.table_actions}>{place.main.temp}</div>
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
    </div>
  );
};

export default PlaceTable;
