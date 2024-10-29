import { Movie } from "./Movie.js";

export interface WishlistItem {
  id: number;
  movie: Movie;
  addedAt: Date;
}

export interface Wishlist {
  items: WishlistItem[];
}
