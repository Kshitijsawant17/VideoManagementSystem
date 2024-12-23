import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WatchPage from './pages/WatchPage';
import PlayListPage from './pages/PlayListPage';
import PlayListManage from './pages/admin/PlayList';
import VideoManage from './pages/admin/Video';
import UserManage from './pages/admin/User';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ClientRoute from './components/ClientRoute';
import AdminRoute from './components/AdminRoute';
import { isAuthenticated } from './utils/auth';

import './App.css';

const App = () => {
  const { theme } = useTheme();
  const authenticated = isAuthenticated();

  return (
    <div
      style={{
        backgroundColor:'#196240',
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/watch/playlist/:id" element={<PlayListPage />} />
          <Route path="/watch/:id" element={<WatchPage />} />

          {/* Client Routes */}
          <Route path="/home" element={<ClientRoute><Home /></ClientRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/user" element={<AdminRoute><UserManage /></AdminRoute>} />
          <Route path="/admin/playlist" element={<AdminRoute><PlayListManage /></AdminRoute>} />
          <Route path="/admin/video" element={<AdminRoute><VideoManage /></AdminRoute>} />
          

          {/* Other Routes */}
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
