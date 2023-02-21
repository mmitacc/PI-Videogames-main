import "./App.css";
import { Routes, Route } from "react-router-dom";
import Videogames from "./components/videogames/Videogames.jsx";
import CreateVideogame from "./components/createVideogame/CreateVideogame.jsx";
import VgameDetail from "./components/vgameDetail/VgameDetail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/videogames" element={<Videogames />} />
      <Route path="/videogames/create" element={<CreateVideogame />} />
      <Route path="/videogames/:id" element={<VgameDetail />} />
    </Routes>
  );
}

export default App;
