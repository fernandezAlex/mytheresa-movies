import { Movie } from "./Movie";

export interface WishlistItem {
  id: number;
  movie: Movie;
  addedAt: Date;
}

export interface Wishlist {
  items: WishlistItem[];
}
