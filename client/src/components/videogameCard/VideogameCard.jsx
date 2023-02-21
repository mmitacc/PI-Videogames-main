import './VideogameCard.css';
import { Link } from "react-router-dom";

const VideogameCard = ( {id, name, rating, image, genres} ) => {
    return(
        <div className="card" >
            <div className="cardImg">
                <img className="imagen" src={image} alt={name} />
            </div>
            <div>
                <Link className="title" to={`/videogames/${id}`}>
                    <h5 className="titleCard" >{name}</h5>
                </Link>
            </div>
            <div>
            {/* <p>Genres: {genres}</> */}
            </div>

        </div>
    )
};

export default VideogameCard;