import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Team from './pages/Team';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import './App.css';

// Admin pages (lazy loaded)
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ProtectedRoute = lazy(() => import('./pages/admin/ProtectedRoute'));
const TeamAdmin = lazy(() => import('./pages/admin/TeamAdmin'));
const BlogAdmin = lazy(() => import('./pages/admin/BlogAdmin'));
const TestimonialAdmin = lazy(() => import('./pages/admin/TestimonialAdmin'));
const ProjectAdmin = lazy(() => import('./pages/admin/ProjectAdmin'));
const ServiceAdmin = lazy(() => import('./pages/admin/ServiceAdmin'));
const ContactsAdmin = lazy(() => import('./pages/admin/Contacts'));
const DashboardHome = lazy(() => import('./pages/admin/DashboardHome'));
const PaymentPage = lazy(() => import('./pages/admin/PaymentPage'));
const PaymentHistory = lazy(() => import('./pages/admin/PaymentHistory'));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<><Header /><Home /><Footer /></>} />
            <Route path="/about" element={<><Header /><About /><Footer /></>} />
            <Route path="/services" element={<><Header /><Services /><Footer /></>} />
            <Route path="/services/:slug" element={<><Header /><ServiceDetail /><Footer /></>} />
            <Route path="/portfolio" element={<><Header /><Portfolio /><Footer /></>} />
            <Route path="/portfolio/:id" element={<><Header /><CaseStudyDetail /><Footer /></>} />
            <Route path="/team" element={<><Header /><Team /><Footer /></>} />
            <Route path="/blog" element={<><Header /><Blog /><Footer /></>} />
            <Route path="/blog/:slug" element={<><Header /><BlogDetail /><Footer /></>} />
            <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />

            {/* Admin routes (no header/footer) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminDashboard />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<DashboardHome />} />
                <Route path="team" element={<TeamAdmin />} />
                <Route path="blog" element={<BlogAdmin />} />
                <Route path="testimonials" element={<TestimonialAdmin />} />
                <Route path="projects" element={<ProjectAdmin />} />
                <Route path="services" element={<ServiceAdmin />} />
                <Route path="contacts" element={<ContactsAdmin />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="payment-history" element={<PaymentHistory />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App; 