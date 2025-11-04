import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardList from "./components/BoardList";
import BoardDetail from "./components/BoardDetail";
import BoardForm from "./components/BoardForm";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/create" element={<BoardForm />} />
        <Route path="/edit/:id" element={<BoardForm />} />
        <Route path="/detail/:id" element={<BoardDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
