// import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Footer, Navbar } from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import MoviesList from "./pages/admin/movies/MoviesList";
import UpdateMovie from "./pages/admin/movies/UpdateMovie";
import CreateMovie from "./pages/admin/movies/CreateMovie";

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/movies" element={<MoviesList />} />
          <Route path="/admin/movies/create" element={<CreateMovie />} />
          <Route path="/admin/movies/update/:id" element={<UpdateMovie />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
