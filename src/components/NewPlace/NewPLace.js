import React from "react";
import { Button } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";

const NewPLace = () => {
  const submitHandler = () => {};

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
          value=""
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
          value=""
        />
      </div>

      {/* {isError && <p className="error"> Please,Enter something</p>} */}
      <Button>Search</Button>
      {/* {isLoading && <Loading />} */}
    </form>
  );
};

export default NewPLace;
