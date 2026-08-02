import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./app/store";
import "./styles/globals.css";

import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HomePageBuilder from "./pages/HomePageBuilder";
import CategoriesPage from "./pages/CategoriesPage";
import ServicesPage from "./components/allServices/ServicesPage";
import PlatformsPage from "./components/allServices/PlatformsPage";
import PlatformFormPage from "./components/allServices/PlatformFormPage";
import SolutionsPage from "./pages/SolutionsPage";
import IndustriesPage from "./components/allServices/IndustriesPage";
import ResourcesPage from "./pages/ResourcesPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import LeadsPage from "./pages/LeadsPage";
import FAQsPage from "./pages/FAQsPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ServiceFormPage from "./components/allServices/ServiceFormPage";
import IndustryFormPage from "./components/allServices/IndustryFormPage";
import BlogForm from "./pages/BlogForm";
import BlogsPage from "./pages/BlogPage";
import CaseStudyFormPage from './pages/CaseStudyFormPage'
import CaseStudyCategoriesPage from "./pages/CaseStudyCategoriesPage";
import CaseStudyStoriesPage from "./pages/CaseStudyStoriesPage";
import CaseStudyStoryFormPage from "./pages/CaseStudyStoryFormPage";
import GuidesPage from "./pages/GuidesPage";
import GuideFormPage from "./pages/GuideFormPage";
import ChecklistsPage from "./pages/ChecklistsPage";
import ChecklistFormPage from "./pages/ChecklistFormPage";
import WhitepapersPage from "./pages/WhitepapersPage";
import WhitepaperFormPage from "./pages/WhitepaperFormPage";

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
        <Route path="case-study-stories" element={<CaseStudyStoriesPage />} />
        <Route path="case-study-stories/new" element={<CaseStudyStoryFormPage />} />
        <Route path="case-study-stories/edit/:slug" element={<CaseStudyStoryFormPage />} />
        {/* <Route path="case-studies" element={<CaseStudiesPage />} /> */}
        <Route path="leads" element={<LeadsPage />} />
        <Route path="faqs" element={<FAQsPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />

        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blog/new" element={<BlogForm />} />
        <Route path="/blog/edit/:id" element={<BlogForm />} />

        <Route path="guides" element={<GuidesPage />} />
        <Route path="guides/new" element={<GuideFormPage />} />
        <Route path="guides/edit/:id" element={<GuideFormPage />} />

        <Route path="checklists" element={<ChecklistsPage />} />
        <Route path="checklists/new" element={<ChecklistFormPage />} />
        <Route path="checklists/edit/:id" element={<ChecklistFormPage />} />

        <Route path="whitepapers" element={<WhitepapersPage />} />
        <Route path="whitepapers/new" element={<WhitepaperFormPage />} />
        <Route path="whitepapers/edit/:id" element={<WhitepaperFormPage />} />
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
