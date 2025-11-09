import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ChatList from "../pages/ChatList";
import ChatRoom from "../pages/ChatRoom";
import NotificationPage from "../pages/NotificationPage";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { loginUser, loading } = useAuth();
  if (loading) return <div>로딩 중...</div>;
  if (!loginUser) return <Navigate to="/login" replace />;
  return children;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <ChatList />
          </PrivateRoute>
        }
      />
      <Route
        path="/chat/:roomId"
        element={
          <PrivateRoute>
            <ChatRoom />
          </PrivateRoute>
        }
      />
      <Route
        path="/notify"
        element={
          <PrivateRoute>
            <NotificationPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
