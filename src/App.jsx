import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./app/store";
import "./styles/globals.css";

import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ServicesPage from "./pages/ServicesPage";
import PlatformsPage from "./pages/PlatformsPage";
import SolutionsPage from "./pages/SolutionsPage";
import IndustriesPage from "./pages/IndustriesPage";
import ResourcesPage from "./pages/ResourcesPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import LeadsPage from "./pages/LeadsPage";
import FAQsPage from "./pages/FAQsPage";
import TestimonialsPage from "./pages/TestimonialsPage";

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="platforms" element={<PlatformsPage />} />
        <Route path="solutions" element={<SolutionsPage />} />
        <Route path="industries" element={<IndustriesPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="case-studies" element={<CaseStudiesPage />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="faqs" element={<FAQsPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}
