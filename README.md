# Mytheresa Movies 🎬

## Overview

The **Mytheresa Movies** project is a web application built to showcase movies in various categories, allow users to view details, and manage a personalized wishlist. This README provides a complete guide on the project’s setup, structure, features, technologies used, and testing procedures.

## Table of Contents

1. [Project Requirements](#project-requirements)
2. [Technologies Used](#technologies-used)
3. [Features and Logic](#features-and-logic)
4. [Setup and Installation](#setup-and-installation)
5. [Testing](#testing)
6. [Challenges and Solutions](#challenges-and-solutions)

---

### Project Requirements

- **Displaying Movies**: Using categories with a responsive carousel layout.
- **Detail Page**: Showing detailed information about each movie.
- **Wishlist Management**: Adding and removing movies from a wishlist, with persistence.
- **Testing**: Providing unit and component tests for key functionalities.

---

### Technologies Used

This project was built with the following libraries and tools:

- **React** - Core UI library for building components and managing state.
- **TypeScript** - Adds static typing, improving maintainability and scalability.
- **React Router** - Handles navigation within the app, allowing dynamic routing for detail pages.
- **Sass (Dart Sass)** - Used for styling with SCSS, including variables, mixins, and modular styles.
- **Jest and React Testing Library** - Provides a testing suite for unit and component tests, ensuring code correctness and component behavior.
- **Vite** - A fast development server and build tool optimized for modern JavaScript frameworks.
- **LocalStorage** - Used to persist wishlist data locally across sessions.

---

### Features and Logic

#### 1. Movie Display with Categories

- **HomePage**: Displays categorized carousels for movies. Each category uses a reusable `Carousel` component.
- **Carousel Component**: Renders movies in a scrollable layout. Clicking on a movie redirects to its detail page.

#### 2. Movie Detail Page

- **DetailPage Component**: Shows a detailed view of a selected movie, including title, overview, and genre.
- **Dynamic Styling**: The page background and styling adjust based on the movie's category, implemented through category-based SCSS variables and mixins.

#### 3. Wishlist Management

- **WishlistContext**: Manages wishlist data across the application, providing `addToWishlist` and `removeFromWishlist` methods.
- **Local Storage Integration**: Wishlist data is stored in `localStorage` for persistence.
- **WishlistCarousel Component**: Dedicated carousel displaying only the movies added to the wishlist, accessible from the HomePage.

---

### Setup and Installation

Follow these steps to get the project running on your local machine:

1.**Clone the Repository**:

   ```bash
   git clone https://github.com/fernandezAlex/mytheresa-movies.git
   cd mytheresa-movies
   ```

2.**Install Dependencies:**

```bash
npm install
```

3.**Set up Environment Variables: Create a .env file in the root directory and add the following:**

```bash
VITE_API_KEY=your_api_key_here
VITE_BASE_URL=your_api_base_url_here
```

4.**Run the Development Server:**

The app should be running on <http://localhost:5173>.

```bash
npm run dev
```

### Testing

This project uses Jest and React Testing Library for testing.

Available Tests

Unit Tests: Ensures the individual logic functions and hooks behave as expected.
Component Tests: Validates that components render correctly and interact as expected.

To execute all tests:

```bash
npm test
```

The test setup file setupTests.ts configures Jest and includes custom matchers (e.g., toBeInTheDocument).

### Challenges and Solutions

During development, the following challenges arose, along with the solutions implemented:

#### Dynamic Category Styling

- **Challenge**: Applying different styles based on movie categories.
- **Solution**: Utilized SCSS maps to dynamically apply colors and fonts based on categories, leveraging SCSS variables and `@each` loops to make styling adaptable and reusable.

#### Wishlist Persistence

- **Challenge**: Maintaining wishlist data across sessions.
- **Solution**: Integrated `localStorage` with the Wishlist context to save and load wishlist data persistently, ensuring the wishlist is preserved even when the user leaves or refreshes the page.

#### Testing Asynchronous Components

- **Challenge**: Testing components that rely on asynchronous API calls.
- **Solution**: Mocked API calls with Jest to simulate API responses, allowing for isolated and reliable tests without relying on network dependencies.

#### SCSS Structure and Mixins

- **Challenge**: Organizing SCSS for scalable and reusable styles.
- **Solution**: Designed a structured SCSS setup, dividing styles into `base`, `components`, `layout`, and `settings` folders, with defined variables, mixins, and media queries for better maintainability and consistency.

---

#### Conclusion

This project demonstrates a comprehensive approach to building a scalable, maintainable React application with TypeScript, advanced SCSS, and thorough testing with Jest and React testing library. Following modern best practices and design patterns ensures a robust and responsive user experience.
