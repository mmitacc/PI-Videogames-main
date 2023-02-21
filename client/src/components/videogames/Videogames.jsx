import "./Videogames.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVideoGames } from "../../redux/action";
import VideogameCard from "../../components/videogameCard/VideogameCard.jsx";
import mainImage from "../../img/newgame.jpg";

const Videogames = () => {
    const dispatch = useDispatch();
    const {videoGames} = useSelector(state => state);
    useEffect(()=>{
        dispatch(getVideoGames())
    }, []);
    console.log("VIDEOGAMES====> ",videoGames);

    return(
        <div className="container" >
        {
            videoGames.map((v, index) => {
                return <VideogameCard
                    key={index}
                    id={v.id}
                    name={v.name}
                    rating={v.rating}
                    image={v.image?v.image:mainImage}
                    // genres={v.genres?.name}
                />
            })
        }
        </div>
    )

}

export default Videogames;