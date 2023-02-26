import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Videogames from "./components/videogames/Videogames.jsx";
import CreateVideogame from "./components/createVideogame/CreateVideogame.jsx";
import VgameDetail from "./components/vgameDetail/VgameDetail.jsx";
import Landing from "./components/landing/Landing";
import NavBar from "./components/navBar/NavBar";

function App() {
  const location = useLocation();
  return (
    <div className="containerApp">
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/videogames" element={<Videogames />} />
        <Route path="/create" element={<CreateVideogame />} />
        <Route path="/videogames/:id" element={<VgameDetail />} />
      </Routes>
    </div>
  );
}

export default App;
