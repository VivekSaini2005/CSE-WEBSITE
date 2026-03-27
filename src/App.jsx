import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Faculty from "./pages/Faculty";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faculty" element={<Faculty />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;