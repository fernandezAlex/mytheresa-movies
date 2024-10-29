import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DetailPage from "../DetailPage";
import { WishlistProvider } from "../../context/WishListContext";
import { getMovieDetails } from "../../services/movieService";

// Mock the service to avoid actual API calls
jest.mock("../../services/movieService", () => ({
  getMovieDetails: jest.fn(),
}));

// Set up mock data and mock implementation
const mockMovie = {
  id: 1,
  title: "Mock Movie",
  poster_path: "/mockpath.jpg",
  overview: "This is a mock movie.",
  genres: [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
  ],
};

(getMovieDetails as jest.Mock).mockResolvedValue(mockMovie);

// Helper function to render the component with necessary context and router
const renderDetailPage = () =>
  render(
    <WishlistProvider>
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    </WishlistProvider>
  );

describe("DetailPage Component", () => {
  it("should render movie details correctly", async () => {
    renderDetailPage();

    expect(await screen.findByText("Mock Movie")).toBeInTheDocument();
    expect(screen.getByText("This is a mock movie.")).toBeInTheDocument();
    expect(screen.getByAltText("Mock Movie")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/mockpath.jpg"
    );
  });

  it("should allow adding and removing movie from wishlist", async () => {
    renderDetailPage();

    // Wait for the button to load
    const addButton = await screen.findByText("Add to Wishlist");
    fireEvent.click(addButton);

    // Verify button text changes after adding to wishlist
    expect(screen.getByText("Remove from Wishlist")).toBeInTheDocument();

    const removeButton = screen.getByText("Remove from Wishlist");
    fireEvent.click(removeButton);

    // Verify button text changes after removing from wishlist
    expect(screen.getByText("Add to Wishlist")).toBeInTheDocument();
  });
});
