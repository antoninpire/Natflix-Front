import moment from "moment";
import "moment/locale/fr";
import { Link } from "react-router-dom";

export function MovieInfos({ movie }) {
  return (
    <>
      <h3 className="movie-title">Titre</h3>
      <p className="movie-value movie-value-bigger">{movie.titre}</p>
      <h3 className="movie-title">Genre(s)</h3>
      <div style={{ display: "flex" }}>
        {movie.nom_genres &&
          movie.nom_genres.split(",").map((genre) => {
            return (
              <Link
                to={`/Search/[Genre]${genre}`}
                className="movie-value-links"
              >
                {genre}
              </Link>
            );
          })}
      </div>

      <h3 className="movie-title">Durée</h3>
      <p className="movie-value">{movie.duree} min.</p>
      <h3 className="movie-title">Moyenne</h3>
      <p className="movie-value">
        {movie.moyenne && movie.moyenne.toFixed(1)} / 5 ({movie.nb_notes} notes)
      </p>
      <h3 className="movie-title">Nombre de visionnages</h3>
      <p className="movie-value">{movie.nb_vues} vue(s)</p>
      <h3 className="movie-title">Producteur(s)</h3>
      <p className="movie-value">
        {movie.nom_producteurs || "Aucun producteur"}
      </p>
      <h3 className="movie-title">Date première diffusion</h3>
      <p className="movie-value">
        {moment(movie.date_diffusion).format("Do MMMM YYYY")}
      </p>
      <h3 className="movie-title">Description</h3>
      <p className="movie-value">{movie.description || "Aucune description"}</p>
    </>
  );
}
