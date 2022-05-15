import { useState } from "react";
import "./App.css";
import NewPLace from "./components/NewPlace/NewPLace";
import PlaceTable from "./components/PlaceTable/PlaceTable";

function App() {
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const onSearch = (coords) => {
    setCoords(coords);
  };
  return (
    <div className="App">
      <NewPLace onSearch={onSearch} />
      <PlaceTable coords={coords} />
    </div>
  );
}

export default App;
