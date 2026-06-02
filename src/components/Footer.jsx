import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Здоровье+</h4>
            <p>Круглосуточный медицинский центр в Москве.</p>
          </div>
          <div className="footer-col">
            <h4>Меню</h4>
            <ul>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/doctors">Врачи</Link></li>
              <li><Link to="/inpatient">Стационар</Link></li>
              <li><Link to="/contacts">Контакты</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Контакты</h4>
            <ul>
              <li><i className="fas fa-phone-alt"></i> +7 (495) 123-45-67</li>
              <li><i className="fas fa-envelope"></i> info@zdorovieplus.ru</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Режим работы</h4>
            <ul>
              <li>Круглосуточно, без выходных</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 Медицинский центр «Здоровье+». Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;