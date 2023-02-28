import "./GenresCard.css";

const GenresCard = ({ name, size }) => {
  return <div className={size ? "textoExt" : "texto"}>✓{name}</div>;
};

export default GenresCard;
