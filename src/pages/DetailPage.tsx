import "../styles/components/_detailPage.scss";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getMovieDetails } from "../services/movieService";
import { Movie } from "../types/Movie";
import { useWishlist } from "../context/WishListContext";
import { WishlistCarousel } from "../components/WishlistCarousel";

interface LocationState {
  title?: string;
}

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const { title } = (state as LocationState) || {};
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string | null>(null);

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const movieData = await getMovieDetails(Number(id));
        setMovie(movieData);

        // Determine the category
        if (movieData.genres && movieData.genres.length > 0) {
          const matchingGenre = movieData.genres.find(
            (g) => g.name.toLowerCase() === title?.toLowerCase()
          );
          setCategory(matchingGenre ? title?.toLowerCase() : null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, [id, title]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  const isOnWishlist = wishlist.some((item) => item.id === movie.id);

  const handleWishlistToggle = () => {
    if (isOnWishlist) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      });
    }
  };

  return (
    <div className={`detail-page`}>
      <header className="header">
        <h1>{movie.title}</h1>
      </header>
      <div className="content">
        <div className="image-area">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className={`description-area category-${category}`}>
          <button
            className={`action-button category-${category}`}
            onClick={handleWishlistToggle}
          >
            {isOnWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
          <p>{movie.overview}</p>
          <h4>{category?.toUpperCase()}</h4>
          <a href="/">Back Home Page</a>
        </div>
      </div>
      <div className="additional-info">
        <div className="carousel-container">
          <WishlistCarousel />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
