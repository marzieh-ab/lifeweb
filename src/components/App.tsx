import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Tag from "./Tag";
import Register from "./Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="tag" element={<Tag />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
