import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of a Movie object
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

// Define context state and methods
interface WishlistContextType {
  wishlist: Movie[];
  addToWishlist: (movie: Movie) => void;
  removeFromWishlist: (movieId: number) => void;
}

// Create context
const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

// Provider component
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  // Load wishlist from local storage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Update local storage whenever the wishlist changes
  const saveWishlistToLocalStorage = (wishlist: Movie[]) => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  // Add movie to wishlist
  const addToWishlist = (movie: Movie) => {
    const updatedWishlist = [...wishlist, movie];
    setWishlist(updatedWishlist);
    saveWishlistToLocalStorage(updatedWishlist);
  };

  // Remove movie from wishlist
  const removeFromWishlist = (movieId: number) => {
    const updatedWishlist = wishlist.filter((movie) => movie.id !== movieId);
    setWishlist(updatedWishlist);
    saveWishlistToLocalStorage(updatedWishlist);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Hook to use wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
