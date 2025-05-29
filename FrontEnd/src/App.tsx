import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/Navbar/Navbar';
import HomePage from './routes/HomePage';
import ShopItem from './routes/ShopItem';
import Login from './pages/Login';
import Register from './pages/Register';
import { SavedSearches } from './components/SavedSearches/SavedSearches';
import { FollowedArticles } from './components/FollowedArticles/FollowedArticles';
import Dashboard from './admin/pages/Dashboard';
import './styles/themes.css';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ShopItem />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/saved-searches" element={<SavedSearches />} />
              <Route path="/followed-articles" element={<FollowedArticles />} />
              <Route path="/admin/*" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
