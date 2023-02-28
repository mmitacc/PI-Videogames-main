import "./VideogameCard.css";
import { Link } from "react-router-dom";
import GenresCard from "../genresCard/GenresCard.jsx";

const VideogameCard = ({ id, name, rating, image, genres }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img className="imagen" src={image} alt={name} />
      </div>
      <div className="space">
        <Link className="title" to={`/videogames/${id}`}>
          <h5 className="space">{name}</h5>
        </Link>
      </div>
      <div className="space distribution">
        {genres?.map((g, index) => {
          return <GenresCard key={index} id={g.id} name={g.name} />;
        })}
      </div>
      <div className="floating">
        <h5>{rating}</h5>
      </div>
    </div>
  );
};

export default VideogameCard;
