import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideoGames, getGenres } from "../../redux/action";
import "./CreateVideogame.css";
import GenresOption from "./GenresOption";

const CreateVideogame = () => {
  //Traer todos los "genres" para mostrar en el Select:
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  const { genres } = useSelector((state) => state);

  //Inicializando el estado local del "input":
  const initialState = {
    name: "",
    description: "",
    rating: 0,
    released: "",
    platforms: [], //Array de NAME de plataformas
    genres: [], //Array de ID de generos
  };

  //Se definen estados locales para el Form:
  const [input, setInput] = useState(initialState);
  //Se definen estados locales para la validación de "error":
  const [error, setError] = useState({
    name: "",
    description: "",
    rating: "",
  });
  //Se definen estados locales para mostrar los Generos en pantalla:
  const [showGenres, setShowGenres] = useState([]);

  //Reglas de validación para campos del "input":
  const validationRules = {
    name: /^(?=.{3,50}$)/, // Nombre con un mínimo de 3 y máximo 50 caracteres.
    description: /^(?=.{5,200}$)/, // Texto con un mínimo de 5 y máximo 200 caracteres.
    rating: /^([0-9]{1,10}(\.[0-9]{1,2})?)$/, // Número: 0 a 10; puede incluir hasta 2 decimales.
  };

  //Function validadora de campos del "input":
  const validateInput = (input) => {
    console.log("INPUT ANTES===> ", input.name);
    if (input.name) {
      if (validationRules.name.test(input.name)) {
        setError({ ...error, name: "" });
      } else {
        setError({
          ...error,
          name: "Nombre con un mínimo de 3 y máximo 50 caracteres",
        });
      }
    }
    if (input.description) {
      if (validationRules.description.test(input.description)) {
        setError({ ...error, description: "" });
      } else {
        setError({
          ...error,
          description: "Texto con un mínimo de 5 y máximo 200 caracteres",
        });
      }
    }
    if (input.rating) {
      if (validationRules.rating.test(input.rating) && input.rating <= 10) {
        setError({ ...error, rating: "" });
      } else {
        setError({
          ...error,
          rating: "Número: 0 a 10; puede incluir hasta 2 decimales",
        });
      }
    }
  };

  const handleOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    validateInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleOnChangePlatforms = (e) => {
    const duplicado = input.platforms.find((obj) => obj === e.target.value);
    if (!duplicado) {
      setInput({ ...input, platforms: [...input.platforms, e.target.value] });
    }
  };

  const handleOnChangeGenres = (e) => {
    const duplicado = input.genres.find((obj) => obj === e.target.value);
    if (!duplicado) {
      setInput({ ...input, genres: [...input.genres, e.target.value] });
      let index = e.target.selectedIndex;
      setShowGenres([...showGenres, e.target.options[index].text]);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const pendingErrors = Object.values(error).join("");
    if (
      !pendingErrors &&
      input.name &&
      input.description &&
      input.rating &&
      input.platforms.length &&
      input.genres.length
    ) {
      dispatch(createVideoGames(input));
      setInput(initialState);
      setShowGenres([]);
    } else {
      if (pendingErrors) alert("Existen errores en los campos...!");
      if (!input.name) alert("Faltan llenar el NOMBRE..!");
      if (!input.description) alert("Faltan llenar la DESCRIPCIÓN..!");
      if (!input.rating) alert("Faltan llenar el RATING..!");
      if (!input.platforms.length)
        alert("Falta ingresar al menos una PLATAFORMA..!");
      if (!input.genres.length) alert("Falta ingresar al menos un GENERO..!");
    }
  };

  const cleanFormOnClick = (e) => {
    setInput(initialState);
    setShowGenres([]);
  };

  return (
    <div>
      <div className=" barraCreate">
        <h3 className="subtitle">{"<Registro de Nuevo Videogame>"}</h3>
        <h5 className="subtitle">
          Por favor, rellene todos los datos requeridos:
        </h5>
      </div>
      <form className="containerCreate" onSubmit={handleOnSubmit}>
        <div className="containerSupC">
          <div className="containerSupC">
            <label className="labelBlue">{"> Nombre: "}</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleOnChange}
              placeholder="Este campo es obligatorio ...!"
              className="elementContainerSupC"
            />
            {error.name !== "" && <p className="labelAlert">{error.name}</p>}
          </div>
          <div className="containerSupC">
            <label className="labelBlue">{">Descripción: "}</label>
            <textarea
              name="description"
              value={input.description}
              onChange={handleOnChange}
              placeholder="Este campo es obligatorio ...!"
              rows={3}
              className="elementContainerSupC"
            />
            {error.description !== "" && (
              <p className="labelAlert">{error.description}</p>
            )}
          </div>
          <div className="containerSupC">
            <label className="labelBlue">{">Rating: "}</label>
            <input
              type="text"
              name="rating"
              value={input.rating}
              onChange={handleOnChange}
              className="elementContainerSupC"
            />
            {error.rating !== "" && (
              <p className="labelAlert">{error.rating}</p>
            )}
          </div>
          <div className="containerSupC">
            <label className="labelBlue">{">Fecha de lanzamiento: "}</label>
            <input
              type="date"
              name="released"
              value={input.released}
              onChange={handleOnChange}
              className="elementContainerSupC"
            />
          </div>
          <div className="containerSupC">
            <label className="labelBlue">{">Plataformas: "}</label>
            <select
              name="platforms"
              value={input.platforms}
              onChange={handleOnChangePlatforms}
              className=" labelBlue"
              // className="elementContainerSupC"
            >
              <option value="Xbox">Xbox</option>
              <option value="PlayStation">PlayStation</option>
              <option value="PC">PC</option>
              <option value="macOS">macOS</option>
              <option value="Apple Macintosh">Apple Macintosh</option>
              <option value="Nintendo">Nintendo</option>
            </select>
            <textarea value={input.platforms} />
          </div>
          <div className="containerSupC">
            <label className="labelBlue">{">Generos: "}</label>
            <select
              name="genres"
              value={input.genres}
              onChange={handleOnChangeGenres}
              className=" labelBlue"
            >
              {genres?.map((gr) => {
                return <GenresOption key={gr.id} id={gr.id} name={gr.name} />;
              })}
            </select>
            <textarea value={showGenres} />
          </div>
        </div>
        <div className="containerButton">
          <button className="blueButton textLink" type="submit">
            Create Videogame
          </button>
          <button
            className="blueButton textLink"
            type="reset"
            onClick={cleanFormOnClick}
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVideogame;
