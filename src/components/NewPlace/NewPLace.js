import React, { useState } from "react";
import { Button } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";

const NewPLace = ({ onSearch }) => {
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
    console.log(coords);
    onSearch(coords);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="latitude">Latitude</label>
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
        <label htmlFor="longitude">Longitude</label>
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

      {/* {isError && <p className="error"> Please,Enter something</p>} */}
      <Button>Search</Button>
      {/* {isLoading && <Loading />} */}
    </form>
  );
};

export default NewPLace;
