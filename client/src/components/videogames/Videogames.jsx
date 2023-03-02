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
  const [typeSearch, setTypeSearch] = useState("Videogame"); //Define un estado local para el tipo de busqueda
  const onChangeFilter = (event) => {
    //Reiniciar filtro de busquedas:
    setSearch("");
    setCurrentPage(0);
    //Recoge el valor de selección del filtro:
    setTypeSearch(event.target.value);
  };

  //Ordenando Videogames por Alfabetico/Rating y Ascendente/Descendente:
  const orderTypoMode = (tipo, modo) => {
    console.log("TIPO====> ", tipo);
    console.log("MODO====> ", modo);
    if (tipo === "Alfabetico") {
      videoGames.sort((a, b) => {
        if (a.name > b.name) return 1 * modo;
        if (a.name < b.name) return -1 * modo;
        return 0;
      });
    } else if (tipo === "Rating") {
      videoGames.sort((a, b) => {
        if (a.rating > b.rating) return 1 * modo;
        if (a.rating < b.rating) return -1 * modo;
        return 0;
      });
    }
  };

  //SELECCIONANDO TIPO PARA ORDENAMIENTO CON ESTADO LOCAL DEL COMPONENTE:---------------------------------------
  const [typeOrder, setTypeOrder] = useState("Alfabetico"); //Define un estado local para busquedas Alfabetico/Rating
  const onChangeTypeOrder = (event) => {
    orderTypoMode(event.target.value, order);
    setTypeOrder(event.target.value);
  };

  //SELECCIONANDO MODO PARA ORDENAMIENTO CON ESTADO LOCAL DEL COMPONENTE:---------------------------------------
  const [order, setOrder] = useState("1"); //Define un estado local para modo Ascendente(1)/Descendente(-1)
  const onChangeOrder = (event) => {
    orderTypoMode(typeOrder, event.target.value);
    setOrder(event.target.value);
  };

  //PAGINACIÓN CON ESTADO LOCAL DEL COMPONENTE:----------------------------------------------------
  const gamesXpag = 15; //Se establece el número de Videogames por Página a mostrar
  const [currentPage, setCurrentPage] = useState(0); //Se define un estado local para la Paginación
  let dataVideogames = [...videoGames]; //Se define el array de Videogames a mostrar
  const filterSearchName = () => {
    //Recorta solo "gamesXpag" Videogames para mostrar por página de la data guardada en "videoGames"
    if (search.length === 0) {
      dataVideogames = [...videoGames];
      return videoGames.slice(currentPage, currentPage + gamesXpag);
    } else if (typeSearch === "Videogame") {
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
      <div className="paginacion barra">
        <div>
          {/* Seccion de filtros por nombre y genero de Videogames */}
          <label className="labelBlue">{" Filtrar por => "}</label>
          <input
            type="radio"
            id="radio1"
            value="Videogame"
            checked={typeSearch === "Videogame" ? true : false}
            onChange={onChangeFilter}
          />
          <label
            className={typeSearch === "Videogame" ? "labelBlue" : null}
            for="radio1"
          >
            Videogame
          </label>
          <input
            type="radio"
            id="radio2"
            value="Genero"
            checked={typeSearch === "Genero" ? true : false}
            onChange={onChangeFilter}
          />
          <label
            className={typeSearch === "Genero" ? "labelBlue" : null}
            for="radio2"
          >
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
        <div>
          {/* Seccion de ORDENAMIENTO de Videogames: Alfabetico ó Rating*/}
          <label className="labelBlue">{" Ordenar por orden => "}</label>
          <input
            type="radio"
            id="radio3"
            value="Alfabetico"
            checked={typeOrder === "Alfabetico" ? true : false}
            onChange={onChangeTypeOrder}
          />
          <label
            className={typeOrder === "Alfabetico" ? "labelBlue" : null}
            for="radio3"
          >
            Alfabetico
          </label>
          <input
            type="radio"
            id="radio4"
            value="Rating"
            checked={typeOrder === "Rating" ? true : false}
            onChange={onChangeTypeOrder}
          />
          <label
            className={typeOrder === "Rating" ? "labelBlue" : null}
            for="radio4"
          >
            Rating
          </label>
          {/* Seccion de ORDENAMIENTO de Videogames: Ascendente ó Descendente*/}
          <input
            type="radio"
            id="radio5"
            value={1}
            checked={order === "1" ? true : false}
            onChange={onChangeOrder}
          />
          <label className={order === "1" ? "labelBlue" : null} for="radio5">
            Ascendente
          </label>
          <input
            type="radio"
            id="radio6"
            value={-1}
            checked={order === "-1" ? true : false}
            onChange={onChangeOrder}
          />
          <label className={order === "-1" ? "labelBlue" : null} for="radio">
            Descendente
          </label>
        </div>
      </div>
      {/* <hr className="lineHorizontal" /> */}
      <div className="paginacion">
        <button className="blueButton" onClick={prevPage}>
          Anteriores
        </button>
        <label className="labelRed">
          {"<--- Página N° "} {currentPage / gamesXpag + 1} {" --->"}
        </label>
        <button className="blueButton" onClick={nextPage}>
          Siguientes
        </button>
      </div>
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
