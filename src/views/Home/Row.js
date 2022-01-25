import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Poster } from "../../components/Poster";

export function Row({ title, isLargeRow, movies, addToLists = () => {} }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: isLargeRow ? 8 : 5,
      paritialVisibilityGutter: 60,
      slidesToSlide: isLargeRow ? 7 : 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      paritialVisibilityGutter: 50,
      slidesToSlide: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      paritialVisibilityGutter: 30,
      slidesToSlide: 3,
    },
  };

  if (!movies || !movies.length) {
    return <></>;
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      {/* <Grid container justifyContent="center" spacing={1}>
        {movies.map((movie) => (
          <Grid key={movie.id} item>
            <Poster movie={movie} isLarge={isLargeRow} />
          </Grid>
        ))}
        </Grid> */}
      {/* <div className="row_posters">
        {movies.map((movie) => (
          <Poster movie={movie} isLarge={isLargeRow} />
        ))}
        </div> */}
      {/* <ImageList
        sx={{
          gridAutoFlow: "column",
        }}
        gap={10}
      >
        {movies.map((movie) => (
          <ImageListItem
            sx={{
              padding: "30px 0",
            }}
          >
            <Poster movie={movie} isLarge={isLargeRow} />
          </ImageListItem>
        ))}
          </ImageList> */}
      <Carousel
        containerClass="carousel-container"
        itemClass="image-item"
        responsive={responsive}
        infinite
      >
        {movies.map((movie) => (
          <Poster movie={movie} isLarge={isLargeRow} addToLists={addToLists} />
        ))}
      </Carousel>
    </div>
  );
}
