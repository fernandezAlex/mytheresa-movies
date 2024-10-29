const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { Movie } from "../types/Movie.js";

interface ApiResponse {
  results: Movie[];
}

export async function getMoviesByCategory(
  categoryId: number
): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${categoryId}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch movies for category ${categoryId}`);
    }
    return response.json();
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}
export async function getMovieDetails(movieId: number): Promise<Movie> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch details for movie ID ${movieId}`);
    }
    return response.json();
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}
