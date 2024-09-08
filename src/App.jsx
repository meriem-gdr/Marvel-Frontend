import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";

import Comics from "./pages/Comics";
import ComicsByCharacter from "./pages/ComicsByCharacter";
import Characters from "./pages/Characters";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/characters" />} />
          <Route
            path="/characters"
            element={<Characters token={token} setUser={setUser} />}
          />
          <Route
            path="/comics"
            element={<Comics token={token} setUser={setUser} />}
          />
          <Route
            path="/comics/:characterId"
            element={<ComicsByCharacter token={token} setUser={setUser} />}
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
