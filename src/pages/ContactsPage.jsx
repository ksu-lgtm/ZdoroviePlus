import React, { useState } from 'react';

const ContactsPage = () => {
  const [fbName, setFbName] = useState('');
  const [fbEmail, setFbEmail] = useState('');
  const [fbPhone, setFbPhone] = useState('');
  const [fbMessage, setFbMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fbName || !fbEmail || !fbMessage) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
    setFbName('');
    setFbEmail('');
    setFbPhone('');
    setFbMessage('');
  };

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Контакты</h1>
          <p>Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить на ваши вопросы.</p>
        </div>
      </section>

      <div className="container section">
        <div className="contacts-grid">
          <div className="contact-card">
            <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
            <h3>Адрес</h3>
            <p>г. Москва, ул. Строителей, д. 15, корп. 2</p>
            <p>м. Проспект Вернадского</p>
          </div>
          <div className="contact-card">
            <div className="contact-icon"><i className="fas fa-phone-alt"></i></div>
            <h3>Телефон</h3>
            <p><a href="tel:+74951234567">+7 (495) 123-45-67</a></p>
            <p><a href="tel:+74951234568">+7 (495) 123-45-68</a> (круглосуточно)</p>
          </div>
          <div className="contact-card">
            <div className="contact-icon"><i className="fas fa-envelope"></i></div>
            <h3>Email</h3>
            <p><a href="mailto:info@zdorovieplus.ru">info@zdorovieplus.ru</a></p>
            <p><a href="mailto:admin@zdorovieplus.ru">admin@zdorovieplus.ru</a></p>
          </div>
          <div className="contact-card">
            <div className="contact-icon"><i className="fas fa-clock"></i></div>
            <h3>Режим работы</h3>
            <p>Круглосуточно</p>
            <p>Без выходных</p>
          </div>
        </div>
      </div>

      <div className="container section">
        <h2>Как нас найти</h2>
        <div className="map-form-grid">
          <div className="map-container">
            <iframe 
              src="https://yandex.ru/map-widget/v1/?ll=37.544,55.673&z=12&pt=37.544,55.673,flag&l=map" 
              allowFullScreen 
              title="Карта"
            ></iframe>
          </div>
          <div className="form-container">
            <h3>Обратная связь</h3>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Ваше имя" 
                value={fbName} 
                onChange={(e) => setFbName(e.target.value)} 
                required 
              />
              <input 
                type="email" 
                placeholder="Ваш Email" 
                value={fbEmail} 
                onChange={(e) => setFbEmail(e.target.value)} 
                required 
              />
              <input 
                type="tel" 
                placeholder="Ваш телефон" 
                value={fbPhone} 
                onChange={(e) => setFbPhone(e.target.value)} 
              />
              <textarea 
                rows="4" 
                placeholder="Ваше сообщение" 
                value={fbMessage} 
                onChange={(e) => setFbMessage(e.target.value)} 
                required
              ></textarea>
              <button type="submit" className="btn-submit">Отправить сообщение</button>
            </form>
          </div>
        </div>
      </div>

      <div className="container section">
        <h2>Режим работы отделений</h2>
        <div className="workhours-grid">
          <div className="workhour-card">
            <i className="fas fa-stethoscope"></i>
            <h3>Приёмное отделение</h3>
            <p>Круглосуточно</p>
            <div className="big-text">24/7</div>
          </div>
          <div className="workhour-card">
            <i className="fas fa-flask"></i>
            <h3>Лаборатория</h3>
            <p>Пн–Вс: 08:00 – 20:00</p>
            <div className="big-text">12 часов</div>
          </div>
          <div className="workhour-card">
            <i className="fas fa-calculator"></i>
            <h3>Плановое отделение</h3>
            <p>Пн–Пт: 09:00 – 18:00</p>
            <div className="big-text">по записи</div>
          </div>
        </div>
      </div>

      <div className="container section">
        <h2>Как добраться</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div className="info-block">
            <h3><i className="fas fa-subway"></i> Общественным транспортом</h3>
            <ul>
              <li><strong>Метро:</strong> ст. «Проспект Вернадского» (5-7 минут пешком)</li>
              <li><strong>Автобусы:</strong> № 111, 222, 333 до остановки «Улица Строителей»</li>
              <li><strong>Маршрутное такси:</strong> № 555, 666</li>
            </ul>
          </div>
          <div className="info-block">
            <h3><i className="fas fa-car"></i> На автомобиле</h3>
            <ul>
              <li>От МКАД: 3 км по Ленинскому проспекту</li>
              <li>Парковка: собственная парковка на 50 мест (бесплатно для пациентов)</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactsPage;