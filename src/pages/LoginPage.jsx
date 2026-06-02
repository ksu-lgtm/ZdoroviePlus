import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // Инициализация пользователей при первом запуске
  const initializeUsers = () => {
    const users = localStorage.getItem('users');
    if (!users) {
      const defaultUsers = [
        { 
          id: 1, 
          email: 'admin@zdorovieplus.ru', 
          password: btoa('admin123'), 
          role: 'admin', 
          name: 'Администратор', 
          phone: '+7 (495) 123-45-67',
          createdAt: new Date().toISOString()
        },
        { 
          id: 2, 
          email: 'user@test.com', 
          password: btoa('user123'), 
          role: 'user', 
          name: 'Тестовый Пользователь', 
          phone: '+7 (900) 123-45-67',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    initializeUsers();
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.email === formData.email && atob(u.password) === formData.password);

    if (user) {
      login({ 
        id: user.id, 
        email: user.email, 
        role: user.role, 
        name: user.name, 
        phone: user.phone 
      });
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError('Неверный email или пароль');
    }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      setLoading(false);
      return;
    }

    if (!formData.name || !formData.email) {
      setError('Пожалуйста, заполните все обязательные поля');
      setLoading(false);
      return;
    }

    initializeUsers();
    const users = JSON.parse(localStorage.getItem('users'));
    
    if (users.find(u => u.email === formData.email)) {
      setError('Пользователь с таким email уже существует');
      setLoading(false);
      return;
    }

    const newUser = {
      id: users.length + 1,
      email: formData.email,
      password: btoa(formData.password),
      role: 'user',
      name: formData.name,
      phone: formData.phone || '',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Регистрация успешна! Теперь войдите в систему.');
    setIsLogin(true);
    setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-info">
            <i className="fas fa-heartbeat"></i>
            <h2>Здоровье+</h2>
            <p>Круглосуточный медицинский центр. Запишитесь к врачу, получите консультацию или пройдите лечение в нашем стационаре.</p>
            <div className="auth-features">
              <p><i className="fas fa-check"></i> 25+ коек стационара</p>
              <p><i className="fas fa-check"></i> 15+ врачей экспертов</p>
              <p><i className="fas fa-check"></i> Круглосуточная помощь</p>
            </div>
          </div>
          
          <div className="auth-form">
            <div className="form-tabs">
              <button 
                className={`tab-btn ${isLogin ? 'active' : ''}`} 
                onClick={() => { setIsLogin(true); setError(''); }}
              >
                Вход
              </button>
              <button 
                className={`tab-btn ${!isLogin ? 'active' : ''}`} 
                onClick={() => { setIsLogin(false); setError(''); }}
              >
                Регистрация
              </button>
            </div>

            {isLogin ? (
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {error && <div className="error-msg">{error}</div>}
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Вход...' : 'Войти'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  name="name"
                  placeholder="ФИО *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Пароль (минимум 6 символов) *"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Подтвердите пароль *"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {error && <div className="error-msg">{error}</div>}
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
              </form>
            )}

            <Link to="/" className="back-link">← Вернуться на главную</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;