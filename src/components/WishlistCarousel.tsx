import { useWishlist } from "../context/WishListContext.js";
import { Carousel } from "./Carousel.js";

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
