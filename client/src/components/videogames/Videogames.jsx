import "./Videogames.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getVideoGames } from "../../redux/action";
import VideogameCard from "../../components/videogameCard/VideogameCard.jsx";
import mainImage from "../../img/videogames.png";

const Videogames = () => {
  //TRAER TODOS LOS VIDEOGAMES DE LA API CON EL ESTADO GLOBAL DEL COMPONENTE:-------------------------------
  const dispatch = useDispatch();
  const { videoGames } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getVideoGames()); //LLena al array "videoGames" con la data de la Api
  }, [dispatch]);

  //SELECCIONANDO TIPO DE BUSQUEDA CON ESTADO LOCAL DEL COMPONENTE:-----------------------------------------
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
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1 * modo;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1 * modo;
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

  //SELECCIONANDO TIPO PARA ORDENAMIENTO CON ESTADO LOCAL DEL COMPONENTE:----------------------------------
  const [typeOrder, setTypeOrder] = useState("Alfabetico"); //Define un estado local para busquedas Alfabetico/Rating
  const onChangeTypeOrder = (event) => {
    orderTypoMode(event.target.value, order);
    setTypeOrder(event.target.value);
  };

  //SELECCIONANDO MODO PARA ORDENAMIENTO CON ESTADO LOCAL DEL COMPONENTE:----------------------------------
  const [order, setOrder] = useState("1"); //Define un estado local para modo Ascendente(1)/Descendente(-1)
  const onChangeOrder = (event) => {
    orderTypoMode(typeOrder, event.target.value);
    setOrder(event.target.value);
  };

  //PAGINACIÓN CON ESTADO LOCAL DEL COMPONENTE:------------------------------------------------------------
  const gamesXpag = 15; //Se establece el número de Videogames por Página a mostrar
  const [currentPage, setCurrentPage] = useState(0); //Se define un estado local para la Paginación
  let dataVideogames = [...videoGames]; //Se define el array de Videogames a mostrar

  //FILTRA/BUSCA EL TEXTO DE ACUERDO AL VIDEOGAME/GENERO:--------------------------------------------------
  const filterSearchName = () => {
    //Recorta solo "gamesXpag" Videogames para mostrar por página de la data guardada en "videoGames"
    if (search.length === 0) {
      dataVideogames = [...videoGames];
      return videoGames.slice(currentPage, currentPage + gamesXpag);
    } else if (typeSearch === "Videogame") {
      let filterSearch = videoGames.filter((vg) =>
        vg.name.toLowerCase().includes(search.toLowerCase())
      );
      dataVideogames = [...filterSearch];
      return filterSearch.slice(currentPage, currentPage + gamesXpag);
    } else {
      let filterSearch = videoGames.filter((vg) => {
        for (const prop of vg.genres) {
          if (prop.name.toLowerCase().includes(search.toLowerCase()))
            return true;
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

  //FILTRO/BUSQUEDA CON ESTADO LOCAL DEL COMPONENTE:------------------------------------------------------
  const [search, setSearch] = useState(""); //Se define un estado local para filtrar por nombres
  const onSearchChange = (event) => {
    setCurrentPage(0);
    setSearch(event.target.value);
  };

  return (
    <div>
      <div className="barra">
        <div>
          {/* Seccion de filtros por nombre y genero de Videogames */}
          <label className="labelBlue">{" Filtrar por => "}</label>
          <select
            name="filterNameGenres"
            value={typeSearch}
            onChange={onChangeFilter}
            className=" labelBlue"
          >
            <option value="Videogame">Videogame</option>
            <option value="Genero">Genero</option>
          </select>
          <input
            className="inputBlue"
            type="text"
            value={search}
            placeholder=" Escriba aquí..."
            onChange={onSearchChange}
          />
        </div>
        <div>
          {/* Seccion de ORDENAMIENTO de Videogames: Alfabetico ó Rating*/}
          <label className="labelBlue">{" Ordenar por => "}</label>
          <select
            name="orderAlfabeticoRating"
            value={typeOrder}
            onChange={onChangeTypeOrder}
            className=" labelBlue"
          >
            <option value="Alfabetico">Alfabetico</option>
            <option value="Rating">Rating</option>
          </select>
          {/* <input
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
          </label> */}
        </div>
        <div>
          {/* Seccion de ORDENAMIENTO de Videogames: Ascendente ó Descendente*/}
          <label className="labelBlue">{"De modo => "}</label>
          <select
            name="orderModoAscendenteDescendente"
            value={order}
            onChange={onChangeOrder}
            className=" labelBlue"
          >
            <option value={1}>Ascendente</option>
            <option value={-1}>Descendente</option>
          </select>
          {/* <input
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
          </label> */}
        </div>
      </div>
      {/* <hr className="lineHorizontal" /> */}
      <div className="paginacion">
        <button className="redButton" onClick={prevPage}>
          Anteriores
        </button>
        <label className="labelRed">
          <abbr title="15 Videogames por página">
            {"<--- Página N° "} {currentPage / gamesXpag + 1} {" --->"}
          </abbr>
        </label>
        <button className="redButton" onClick={nextPage}>
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
