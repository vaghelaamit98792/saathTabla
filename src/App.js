// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import { Spinner } from "./components/common/Spinner";
const Home = React.lazy(() => import("./pages/Home/Home"));

function App() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Router>
        <div className="App">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </Router>
    </React.Suspense>
  );
}

export default App;
