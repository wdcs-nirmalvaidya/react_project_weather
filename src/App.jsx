import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";


function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Weather & AQI Dashboard</h1>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forecast/:city" element={<Forecast />} />
       

        </Routes>
      </main>
    </div>
  );
}

export default App;
