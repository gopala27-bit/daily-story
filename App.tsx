
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import WriteStoryPage from './pages/WriteStoryPage';
import ProfilePage from './pages/ProfilePage';
import AppLayout from './pages/AppLayout';
import AuthLayout from './pages/AuthLayout';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-16 h-16 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/home" />} />
          <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/home" />} />
        </Route>
        
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/write" element={<WriteStoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        
        <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
