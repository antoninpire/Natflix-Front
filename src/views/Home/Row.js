import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Poster } from "../../components/Poster";
import { v4 as uuid } from "uuid";

export function Row({ title, isLargeRow, movies }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: isLargeRow ? 7 : 5,
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
      <Carousel itemClass="image-item" responsive={responsive} infinite>
        {movies.map((movie) => (
          <Poster key={uuid()} movie={movie} isLarge={isLargeRow} />
        ))}
      </Carousel>
    </div>
  );
}
