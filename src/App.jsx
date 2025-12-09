import Header from "./components/Header";
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [searchFn, setSearchFn] = useState(null);

  return (
    <>
      {/* HEADER always visible */}
      <Header onSearch={(city) => searchFn && searchFn(city)} />

      <Routes>
        <Route
          path="/"
          element={<Home registerSearchFn={(fn) => setSearchFn(() => fn)} />}
        />
        <Route path="/forecast/:city" element={<Forecast />} />
      </Routes>
    </>
  );
}
