import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PropertyDetail from './pages/PropertyDetail';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Browse from './pages/Browse';
import LiveAuctions from './pages/LiveAuctions';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AddProperty from './pages/AddProperty';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            {/* Public routes with layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="browse" element={<Browse />} />
              <Route path="live-auctions" element={<LiveAuctions />} />
              <Route path="property/:id" element={<PropertyDetail />} />
              
              {/* Protected routes */}
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="add-property" element={
                <ProtectedRoute>
                  <AddProperty />
                </ProtectedRoute>
              } />
            </Route>

            {/* Auth routes without layout */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* 404 and redirects */}
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;