import { useNavigate } from "react-router-dom";
import "../styles/components/_carousel.scss";

interface CarouselProps {
  title: string;
  movies: Array<{ id: number; title: string; poster_path: string }>;
}

export const Carousel = ({ title, movies }: CarouselProps) => {
  const navigate = useNavigate();

  const goToMovieDetails = (movieId: number) => {
    navigate(`/movie/${movieId}`, { state: { title } });
  };

  return (
    <div className="carousel">
      <h2>{title}</h2>
      <div className="carousel-items">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="carousel-item"
            onClick={() => goToMovieDetails(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
