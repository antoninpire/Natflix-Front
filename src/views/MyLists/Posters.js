import Grid from "@mui/material/Grid";
import { Poster } from "../../components/Poster";

export function Posters({ movies }) {
  return (
    <>
      {movies.length && (
        <Grid container justifyContent="flex-start" spacing={1.5}>
          {movies.map((film) => (
            <Grid key={film.id} item>
              <Poster movie={film} isLarge width="auto" maxHeight={220} />
            </Grid>
          ))}
        </Grid>
      )}
      {!movies.length && (
        <p style={{ color: "white", paddingLeft: "2rem" }}>Aucun film</p>
      )}
    </>
  );
}
