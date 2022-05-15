import { useState } from "react";
import { Button } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";

import styles from "./NewPlace.module.css";

export const NewPLace = ({ onSearch }) => {
  const [coords, setCoords] = useState({ latitude: "", longitude: "" });

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
    onSearch(coords);
    setCoords({ latitude: "", longitude: "" });
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div>
        <label htmlFor="latitude"></label>
        <Input
          type="number"
          id="latitude"
          placeholder="Latitude"
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
          placeholder="Longitude"
          name="longitude"
          required
          value={coords.longitude}
          onChange={onChangHandler}
        />
      </div>
      <Button>Search</Button>
    </form>
  );
};
