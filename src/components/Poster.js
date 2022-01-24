import { useHistory } from "react-router-dom";

export function Poster({ movie, isLarge, maxHeight = 250, width = "100%" }) {
  const history = useHistory();

  const handleClick = (movie) => {
    history.push(`/Movie/${movie.id}`);
  };

  return (
    <div className="poster-card">
      <img
        key={movie.id}
        onClick={() => handleClick(movie)}
        className={`row_poster ${isLarge && "row_posterLarge"}`}
        src={isLarge ? movie.url_affiche : movie.url_image}
        alt={movie.titre}
        style={{ maxHeight, width }}
      />
    </div>
  );
}
