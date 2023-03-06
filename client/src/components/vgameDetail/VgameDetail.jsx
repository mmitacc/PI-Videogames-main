import "./VgameDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { cleanVgamesDetail, getVgamesDetail } from "../../redux/action";
import GenresCard from "../genresCard/GenresCard";
import mainImage from "../../img/newgame.jpg";
import parse from "html-react-parser";

const VgameDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log("ID====> ", id);
  useEffect(() => {
    dispatch(getVgamesDetail(id));
    return () => dispatch(cleanVgamesDetail());
  }, [dispatch, id]);
  const vGamesDetail = useSelector((state) => state.vGamesDetail);
  // console.log("DEAIL====>> ", vGamesDetail);
  const { name, image, genres, description, released, rating, platforms } =
    vGamesDetail;

  return (
    <div className="cardContainerD">
      <div className="cardCenter">
        <div className="cardDetail">
          <img className="imagenD" src={image ? image : mainImage} alt={name} />
        </div>
        <div className="cardDetail">
          <h2 className="cardDetail">{name}</h2>
        </div>
      </div>
      <div className="cardDetail">
        <h5 className="cardDetail">RATING: {rating}</h5>
      </div>
      <div className="cardDetail" id="desc">
        <h5 className="cardDetail">DESCRIPTION:</h5>
        <p className="cardDetail smalltexto">
          {" "}
          {parse(description ? description : "---")}
        </p>
      </div>
      <div className="cardDetail">
        <h5 className="cardDetail">RELEASED: {released}</h5>
      </div>
      <div className="cardDetail">
        <h5 className="cardDetail">GENRES:</h5>
        <div className="distributionD">
          {genres?.map((g, index) => (
            <GenresCard key={index} id={g.id} name={g.name} size="detail" />
          ))}
        </div>
      </div>
      <div className="cardDetail">
        <h5 className="cardDetail">PLATFORMS:</h5>
        <div className="distributionD">
          {platforms?.map((p, index) => (
            <GenresCard key={index} id={p.id} name={p.name} size="detail" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VgameDetail;
