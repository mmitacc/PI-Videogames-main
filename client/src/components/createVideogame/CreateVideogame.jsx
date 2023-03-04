import { useState } from "react";
import { useDispatch } from "react-redux";
import { createVideoGames } from "../../redux/action";
import "./CreateVideogame.css";

const CreateVideogame = () => {
  const initialState = {
    name: "",
    description: "",
    rating: 0,
    platforms: [], //Array de name de plataformas
    genres: [], //Array de ID de generos
  };

  const [input, setInput] = useState(initialState);
  const [error, setError] = useState({
    name: "",
    description: "",
    rating: 0,
  });

  const handleOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    validateInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateInput = (input) => {
    if (/^[0-9]+([,][0-9]+)?$/.test(input.rating)) {
      setError({ ...error, rating: "" });
    } else if (input.rating === "") {
      setError({ ...error, rating: "Este campo es obligatorio llenarlo." });
    } else {
      setError({ ...error, rating: "Debe ser un número con 02 decimales." });
    }

    //NOMBRES DE USUARIO===>  /^[a-z0-9_-]{3,16}$/
  };

  const handleOnChangePlatforms = (e) => {
    e.preventDefault();
    setInput({ ...input, platforms: [...input.platforms, e.target.value] });
  };

  const handleOnChangeGenres = (e) => {
    setInput({ ...input, genres: [...input.genres, parseInt(e.target.value)] });
  };

  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createVideoGames(input));
    setInput(initialState);
  };

  return (
    <div>
      <div className=" barraCreate">
        <h3 className="subtitle">{"<Registro de Nuevo Videogame>"}</h3>
        <h5 className="subtitle">
          Por favor, rellene todos los campos requeridos:
        </h5>
      </div>
      <form className="containerCreate" onSubmit={handleOnSubmit}>
        <div>
          <label className="labelBlue">{"> Name:"}</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleOnChange}
            size="50"
          />
        </div>
        <div>
          <label className="labelBlue">{">Description: "}</label>
          <input
            type="text"
            name="description"
            value={input.description}
            onChange={handleOnChange}
            size="45"
          />
        </div>
        <div>
          <label className="labelBlue">{">Rating: "}</label>
          <input
            type="text"
            name="rating"
            value={input.rating}
            onChange={handleOnChange}
            size="49"
          />
          {error.rating !== "" ? (
            <p className="labelAlert">{error.rating}</p>
          ) : null}
        </div>
        <div>
          <label className="labelBlue">{">Platforms: "}</label>
          <select name="platforms" required>
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            <option value="PC">PC</option>
            <option value="macOS">macOS</option>
            <option value="Apple Macintosh">Apple Macintosh</option>
            <option value="Nintendo">Nintendo</option>
          </select>
          <button className="blueButton" onClick={handleOnChangePlatforms}>
            {"==>"}
          </button>
          <input
            type="text"
            name="platforms"
            value={input.platforms}
            onChange={handleOnChange}
            size="60"
          />
          {/* <label> || </label>
          <input
            type="text"
            name="platforms"
            value={input.platforms}
            onChange={handleOnChangePlatforms}
          /> */}
        </div>
        <div>
          <label className="labelBlue">genres: </label>
          <input
            type="text"
            name="genres"
            value={input.genres.id}
            onChange={handleOnChangeGenres}
          />
        </div>
        <button className="blueButton" type="submit">
          Create Videogame
        </button>
      </form>
    </div>
  );
};

export default CreateVideogame;

// {
// 	"name": "I'm hero you",
// 	"description": "Juego SHD only, only...",
// 	"rating": 0.5,
// 	"platforms": [ "Nintendo", "PC", "PlayStation"	],
// 	"genres": [10, 40, 7]
// }
