import React from "react";
import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import AppNavBar from "./components/AppNavBar";
import theme from "./utils/palette";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const Layout: React.FC = () => {
  return (
    <div>
      <AppNavBar />
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
