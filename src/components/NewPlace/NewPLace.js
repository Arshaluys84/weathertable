import { useState } from "react";
import { Button } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";

import styles from "./NewPlace.module.css";

export const NewPLace = ({ onSearch }) => {
  const [coords, setCoords] = useState({ latitude: "", longitude: "" });
  const [isValid, setIsValid] = useState(true);

  const onChangHandler = (e) => {
    setCoords((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      coords.latitude < -90 ||
      coords.latitude > 90 ||
      coords.longitude < -180 ||
      coords.longitude > 180
    ) {
      setIsValid(false);
      return;
    }
    onSearch(coords);
    setCoords({ latitude: "", longitude: "" });
    setIsValid(true);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div>
        <label htmlFor="latitude"></label>
        <Input
          type="number"
          id="latitude"
          placeholder="Latitude(-90 ~ 90)"
          name="latitude"
          required
          value={coords.latitude}
          onChange={onChangHandler}
        />
      </div>
      <div>
        <label htmlFor="longitude"></label>
        <Input
          type="number"
          id="longitude"
          placeholder="Longitude(-180 ~ 180)"
          name="longitude"
          required
          value={coords.longitude}
          onChange={onChangHandler}
        />
      </div>
      {!isValid && <p>Enter valid numbers </p>}
      <Button>Search</Button>
    </form>
  );
};
