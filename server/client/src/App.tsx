import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import OtpVerify from "./pages/OtpVerify";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { RequireAuth } from "./components/common/RequireAuth";
import { useEffect } from "react";
import axios from "axios";
import useAuth from "./hooks/useAuth";

function App() {
  const { setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get("/api/user/getUser");
        if (res.data.data) {
          setUser(res.data.data._id);
          navigate(location.pathname, { replace: true });
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCurrentUser();
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="h-[100vh]">
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/otpVerify" element={<OtpVerify />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
