import "../styles/components/_homePage.scss";
import { useEffect, useState } from "react";
import { Carousel } from "../components/Carousel";
import { getMoviesByCategory } from "../services/movieService";
import { Movie } from "../types/Movie";
import { WishlistCarousel } from "../components/WishlistCarousel";

const HomePage = () => {
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch movies based on category
  const loadMovies = async () => {
    try {
      const [actionData, comedyData, dramaData] = await Promise.all([
        getMoviesByCategory(28), // Action (id: 28)
        getMoviesByCategory(35), // Comedy (id: 35)
        getMoviesByCategory(18), // Drama (id: 18)
      ]);

      setActionMovies(actionData.results);
      setComedyMovies(comedyData.results);
      setDramaMovies(dramaData.results);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="homepage">
      <h1>Movies by Category</h1>
      <div className="carousel-container">
        <Carousel title="Action" movies={actionMovies} />{" "}
      </div>
      <div className="carousel-container">
        <Carousel title="Comedy" movies={comedyMovies} />
      </div>
      <div className="carousel-container">
        <Carousel title="Drama" movies={dramaMovies} />
      </div>
      <div className="carousel-container">
        <WishlistCarousel />
      </div>
    </div>
  );
};

export default HomePage;
