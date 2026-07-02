import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";
import Home from "@/pages/Home";
import Play from "@/pages/Play";
import Puzzles from "@/pages/Puzzles";
import PuzzleSolver from "@/pages/PuzzleSolver";
import Lessons from "@/pages/Lessons";
import LessonView from "@/pages/LessonView";
import Coach from "@/pages/Coach";

function App() {
  return (
    <div className="App">
      <Starfield />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/puzzles" element={<Puzzles />} />
          <Route path="/puzzles/:id" element={<PuzzleSolver />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:id" element={<LessonView />} />
          <Route path="/coach" element={<Coach />} />
        </Routes>
      </BrowserRouter>
      <Toaster theme="dark" position="top-right" richColors />
    </div>
  );
}

export default App;
