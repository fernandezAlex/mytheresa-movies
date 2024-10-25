const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
export async function getMoviesByCategory(categoryId: number) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${categoryId}`
  );
  if (!response.ok) throw new Error("Failed to get movies");
  return response.json();
}
