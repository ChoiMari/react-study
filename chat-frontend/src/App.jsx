import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ChatRoomList from "./components/ChatRoomList";
import ChatRoom from "./components/ChatRoom";
import Register from "./components/Register";
import NotificationPage from "./components/NotificationPage";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatrooms" element={<ChatRoomList />} />
        <Route path="/chat/:roomId" element={<ChatRoom />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
