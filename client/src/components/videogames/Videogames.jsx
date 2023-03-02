import "./Videogames.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getVideoGames } from "../../redux/action";
import VideogameCard from "../../components/videogameCard/VideogameCard.jsx";
import mainImage from "../../img/newgame.jpg";

const Videogames = () => {
  //TRAER TODOS LOS VIDEOGAMES DE LA API CON EL ESTADO GLOBAL DEL COMPONENTE:---------------------
  const dispatch = useDispatch();
  const { videoGames } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getVideoGames()); //LLena al array "videoGames" con la data de la Api
  }, []);

  //SELECCIONANDO TIPO DE BUSQUEDA CON ESTADO LOCAL DEL COMPONENTE:---------------------------------------------
  const [order, setOrder] = useState("Videogame"); //Se define un estado local para Buscar nombres de "videoGames"
  const onChangeFilter = (event) => {
    //Reiniciar filtro de busquedas:
    setSearch("");
    setCurrentPage(0);
    //Recoge el valor de selección del filtro:
    setOrder(event.target.value);
  };
  // Ordenando por NOMBRE de videoGames:
  // videoGames.sort((a, b) => {
  //   if (a.id > b.id) return 1;
  //   if (a.id < b.id) return -1;
  //   return 0;
  // });

  //PAGINACIÓN CON ESTADO LOCAL DEL COMPONENTE:----------------------------------------------------
  const gamesXpag = 15; //Se establece el número de Videogames por Página a mostrar
  const [currentPage, setCurrentPage] = useState(0); //Se define un estado local para la Paginación
  let dataVideogames = []; //Se define el array de Videogames a mostrar
  const filterSearchName = () => {
    //Recorta solo "gamesXpag" Videogames para mostrar por página de la data guardada en "videoGames"
    if (search.length === 0) {
      dataVideogames = [...videoGames];
      return videoGames.slice(currentPage, currentPage + gamesXpag);
    } else if (order === "Videogame") {
      let filterSearch = videoGames.filter((vg) => vg.name.includes(search));
      dataVideogames = [...filterSearch];
      return filterSearch.slice(currentPage, currentPage + gamesXpag);
    } else {
      let filterSearch = videoGames.filter((vg) => {
        for (const prop of vg.genres) {
          if (prop.name.includes(search)) return true;
        }
      });
      dataVideogames = [...filterSearch];
      return filterSearch.slice(currentPage, currentPage + gamesXpag);
    }
  };
  const prevPage = () => {
    //Lógica de paginación "anterior"
    currentPage > 0 && setCurrentPage(currentPage - gamesXpag);
  };
  const nextPage = () => {
    //Lógica de paginación "siguiente"
    dataVideogames.length > currentPage + gamesXpag &&
      setCurrentPage(currentPage + gamesXpag);
  };

  //FILTRO/BUSQUEDA CON ESTADO LOCAL DEL COMPONENTE:---------------------------------------------
  const [search, setSearch] = useState(""); //Se define un estado local para filtrar por nombres
  const onSearchChange = (event) => {
    setCurrentPage(0);
    setSearch(event.target.value);
  };

  return (
    <div>
      <div className="paginacion">
        <label className="labelBlue">{" Filtrar por => "}</label>
        <input
          type="radio"
          id="radio1"
          value="Videogame"
          checked={order === "Videogame" ? true : false}
          onChange={onChangeFilter}
        />
        <label
          className={order === "Videogame" ? "labelBlue" : null}
          for="radio1"
        >
          Videogame
        </label>
        <input
          type="radio"
          id="radio2"
          value="Genero"
          checked={order === "Genero" ? true : false}
          onChange={onChangeFilter}
        />
        <label className={order === "Genero" ? "labelBlue" : null} for="radio2">
          Genero
        </label>
        <input
          className="inputBlue"
          type="text"
          value={search}
          placeholder="Escriba aquí..."
          onChange={onSearchChange}
        />
      </div>
      <button className="blueButton" onClick={prevPage}>
        Anteriores
      </button>
      <label>-- Página N° {currentPage / gamesXpag + 1} --</label>
      <button className="blueButton" onClick={nextPage}>
        Siguientes
      </button>
      <div className="containerVG">
        {filterSearchName().map((v, index) => {
          return (
            <VideogameCard
              key={index}
              id={v.id}
              name={v.name}
              rating={v.rating}
              image={v.image ? v.image : mainImage}
              genres={v.genres}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Videogames;
