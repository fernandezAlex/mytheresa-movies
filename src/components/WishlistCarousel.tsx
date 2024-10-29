import { useWishlist } from "../context/WishListContext";
import { Carousel } from "./Carousel";

export const WishlistCarousel = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return <p>Your wishlist is empty. Add some movies to see them here!</p>;
  }
  return (
    <div className="wishlist-carousel">
      <Carousel title="Your Wishlist " movies={wishlist} />
    </div>
  );
};
