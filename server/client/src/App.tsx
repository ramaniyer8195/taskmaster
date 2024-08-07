import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import OtpVerify from "./pages/OtpVerify";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AppBar from "./components/app-bar/AppBar";

function App() {
  const theme = createTheme({});

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/otpVerify" element={<OtpVerify />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
