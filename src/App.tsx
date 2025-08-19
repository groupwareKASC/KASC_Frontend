import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Attendence from "./pages/Attendence";

function App() {
  return (
    <div className="App">
      <nav>
        <p>
          <Link to="/">출석 페이지</Link>
        </p>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Attendence />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
