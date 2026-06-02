import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Здоровье+</Link>
        <div className="nav-links">
          <Link to="/">Главная</Link>
          <Link to="/doctors">Врачи</Link>
          <Link to="/inpatient">Стационар</Link>
          <Link to="/contacts">Контакты</Link>
          
          {currentUser ? (
            <>
              {currentUser.role === 'admin' ? (
                <Link to="/admin" className="btn-nav">Админ-панель</Link>
              ) : (
                <Link to="/dashboard" className="btn-nav">Личный кабинет</Link>
              )}
              <span style={{ color: 'var(--gray)', marginLeft: '10px' }}>
                👋 {currentUser.name}
              </span>
              <button onClick={handleLogout} className="logout-btn">Выйти</button>
            </>
          ) : (
            <Link to="/login" className="btn-nav">Вход</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;