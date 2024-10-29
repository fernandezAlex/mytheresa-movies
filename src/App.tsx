import "./styles/global.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./context/WishListContext.js";
import HomePage from "./pages/HomePage.js";
import { DetailPage } from "../src/pages/DetailPage.js";

function App() {
  return (
    <WishlistProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<DetailPage />} />
        </Routes>
      </Router>
    </WishlistProvider>
  );
}

export default App;
