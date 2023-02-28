import "./Landing.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getGenres } from "../../redux/action";

const Landing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
  }, []);

  return (
    <div className="marco title">
      <h1>My VideoGames - App</h1>
      <h3>Versión 1.0</h3>
      <p>
        Diseño-prototipado(React, Redux, Sequelize, Postgresql, y otras
        librerias y middleware).
      </p>
      <p>
        Agradecimiento y mención a la API "RAWG", por el uso de su valiosa data.
      </p>
      <Link className="title" to={"/videogames"}>
        <h4 className="boton ">Empecemos...</h4>
      </Link>
    </div>
  );
};

export default Landing;
