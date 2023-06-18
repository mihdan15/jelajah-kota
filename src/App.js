import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DetailPage from "./pages/DetailPage";
import DestinasiPage from "./pages/DestinasiPage";
import AddData from "./pages/AddData";
import EditData from "./pages/EditData";
import { ContactPage } from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/destinasi" element={<DestinasiPage />} />
      <Route path="/tambah" element={<AddData />} />
      <Route path="/edit" element={<EditData />} />
      <Route path="/gallery" element={<GalleryPage />} />
    </Routes>
  );
}

export default App;
