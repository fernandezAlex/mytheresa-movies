import { renderHook, act } from "@testing-library/react";
import { WishlistProvider, useWishlist } from "./WishListContext";

// Wrap the hook rendering in the WishlistProvider
const renderWishlistHook = () =>
  renderHook(() => useWishlist(), {
    wrapper: WishlistProvider,
  });

describe("Wishlist Context", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should add a movie to the wishlist", () => {
    const { result } = renderWishlistHook();

    act(() => {
      result.current.addToWishlist({
        id: 1,
        title: "Movie 1",
        poster_path: "/path1.jpg",
      });
    });

    expect(result.current.wishlist).toHaveLength(1);
    expect(result.current.wishlist[0].title).toBe("Movie 1");
  });

  it("should remove a movie from the wishlist", () => {
    const { result } = renderWishlistHook();

    act(() => {
      result.current.addToWishlist({
        id: 1,
        title: "Movie 1",
        poster_path: "/path1.jpg",
      });
      result.current.removeFromWishlist(1);
    });

    expect(result.current.wishlist).toHaveLength(0);
  });

  it("should persist the wishlist to local storage", () => {
    const { result } = renderWishlistHook();

    act(() => {
      result.current.addToWishlist({
        id: 1,
        title: "Movie 1",
        poster_path: "/path1.jpg",
      });
    });

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    expect(savedWishlist).toHaveLength(1);
    expect(savedWishlist[0].title).toBe("Movie 1");
  });
});
