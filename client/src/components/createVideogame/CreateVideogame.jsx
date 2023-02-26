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

  let [input, setInput] = useState(initialState);

  let handleOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  let handleOnChangePlatforms = (e) => {
    e.preventDefault();
    setInput({ ...input, platforms: [...input.platforms, e.target.value] });
  };

  let handleOnChangeGenres = (e) => {
    setInput({ ...input, genres: [...input.genres, parseInt(e.target.value)] });
  };

  let dispatch = useDispatch();

  let handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createVideoGames(input));
    setInput(initialState);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={input.description}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>Rating: </label>
          <input
            type="text"
            name="rating"
            value={input.rating}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>Platforms: </label>
          <select name="platforms" required>
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            <option value="PC">PC</option>
            <option value="macOS">macOS</option>
            <option value="Apple Macintosh">Apple Macintosh</option>
            <option value="Nintendo">Nintendo</option>
          </select>
          <button onClick={handleOnChangePlatforms} > {"==>"} </button>
          {/* <label> || </label>
          <input
            type="text"
            name="platforms"
            value={input.platforms}
            onChange={handleOnChangePlatforms}
          /> */}
        </div>
        <div>
          <label>genres: </label>
          <input
            type="text"
            name="genres"
            value={input.genres.id}
            onChange={handleOnChangeGenres}
          />
        </div>
        <button type="submit">Create Videogame</button>
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
