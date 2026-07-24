import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./app/store";
import "./styles/globals.css";

import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HomePageBuilder from "./pages/HomePageBuilder";
import CategoriesPage from "./pages/CategoriesPage";
import ServicesPage from "./pages/ServicesPage";
import PlatformsPage from "./pages/PlatformsPage";
import SolutionsPage from "./pages/SolutionsPage";
import IndustriesPage from "./pages/IndustriesPage";
import ResourcesPage from "./pages/ResourcesPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import LeadsPage from "./pages/LeadsPage";
import FAQsPage from "./pages/FAQsPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ServiceFormPage from "./pages/ServiceFormPage";
import PlatformFormPage from "./pages/PlatformFormPage";
import IndustryFormPage from "./pages/IndustryFormPage";
import BlogCategoriesPage from "./pages/BlogCategoriesPage";
import BlogForm from "./pages/BlogForm";
import BlogsPage from "./pages/BlogPage";
import CaseStudyFormPage from './pages/CaseStudyFormPage'
import CaseStudyCategoriesPage from "./pages/CaseStudyCategoriesPage";

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
        <Route path="home-page" element={<HomePageBuilder />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/new" element={<ServiceFormPage />} />
        <Route path="services/edit/:slug" element={<ServiceFormPage />} />

        <Route path="platforms" element={<PlatformsPage />} />
        <Route path="platforms/new" element={<PlatformFormPage />} />
        <Route path="platforms/edit/:slug" element={<PlatformFormPage />} />

        <Route path="solutions" element={<SolutionsPage />} />
        <Route path="industries" element={<IndustriesPage />} />
        <Route path="industries/new" element={<IndustryFormPage />} />
        <Route path="industries/edit/:slug" element={<IndustryFormPage />} />

        <Route path="resources" element={<ResourcesPage />} />
        <Route path="case-studies" element={<CaseStudiesPage />} />
        <Route path="case-studies/new" element={<CaseStudyFormPage />} />
        <Route path="case-studies/edit/:slug" element={<CaseStudyFormPage />} />
        <Route path="case-study-categories" element={<CaseStudyCategoriesPage />} />
        {/* <Route path="case-studies" element={<CaseStudiesPage />} /> */}
        <Route path="leads" element={<LeadsPage />} />
        <Route path="faqs" element={<FAQsPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />

        <Route path="/blog-categories" element={<BlogCategoriesPage />} />
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blog/new" element={<BlogForm />} />
        <Route path="/blog/edit/:id" element={<BlogForm />} />
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
