import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      {/* Герой секция - как в вашем index.html */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1>Забота о здоровье <span>24/7</span></h1>
              <p>Круглосуточный медицинский центр с современным оборудованием, опытными врачами и комфортным стационаром. Мы здесь, когда вы нас нуждаетесь.</p>
              <div className="hero-buttons">
                <Link to="/doctors" className="btn btn-primary">Записаться на приём</Link>
                <Link to="/contacts" className="btn btn-outline">Связаться с нами</Link>
              </div>
              <div className="hero-stats">
                <div className="stat"><h3>25+</h3><p>коек стационара</p></div>
                <div className="stat"><h3>15+</h3><p>врачей экспертов</p></div>
                <div className="stat"><h3>24/7</h3><p>круглосуточно</p></div>
              </div>
            </div>
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800" alt="Медицинский центр" />
            </div>
          </div>
        </div>
      </section>

      {/* Услуги - как в вашем index.html */}
      <section id="services">
        <div className="container">
          <h2>Наши услуги</h2>
          <div className="services-grid">
            <div className="service-card"><i className="fas fa-stethoscope"></i><h3>Консультация специалиста</h3><p>Приём терапевта, кардиолога, невролога и других врачей</p></div>
            <div className="service-card"><i className="fas fa-bed"></i><h3>Дневной стационар</h3><p>Процедуры и лечение без круглосуточного пребывания</p></div>
            <div className="service-card"><i className="fas fa-hospital-user"></i><h3>Круглосуточный стационар</h3><p>Палаты стандарт и VIP, питание, уход 24/7</p></div>
            <div className="service-card"><i className="fas fa-heartbeat"></i><h3>Реабилитация</h3><p>Восстановление после операций и заболеваний</p></div>
          </div>
        </div>
      </section>

      {/* Преимущества - как в вашем index.html */}
      <section className="section-light">
        <div className="container">
          <h2>Почему выбирают нас</h2>
          <div className="features-grid">
            <div className="feature"><div className="icon-circle"><i className="fas fa-user-md"></i></div><h3>Опытные врачи</h3><p>Кандидаты наук, стаж от 10 лет</p></div>
            <div className="feature"><div className="icon-circle"><i className="fas fa-microscope"></i></div><h3>Современное оборудование</h3><p>МРТ, КТ, УЗИ экспертного класса</p></div>
            <div className="feature"><div className="icon-circle"><i className="fas fa-bed"></i></div><h3>Комфортные палаты</h3><p>1-2 местные номера, телевизор, Wi-Fi</p></div>
            <div className="feature"><div className="icon-circle"><i className="fas fa-clock"></i></div><h3>Поддержка 24/7</h3><p>Врачи и медсёстры круглосуточно</p></div>
          </div>
        </div>
      </section>

      {/* О центре - как в вашем index.html */}
      <section>
        <div className="container">
          <h2>О медицинском центре</h2>
          <div className="about-grid">
            <div className="about-card">
              <img src="https://images.pexels.com/photos/7089043/pexels-photo-7089043.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Современное оборудование" style={{width:'100%', height:'260px', objectFit:'cover'}} />
              <div className="about-card-content"><h3>Современное оборудование</h3><p>Мы оснащены техникой последнего поколения: цифровые аппараты УЗИ, МРТ, ЭКГ и лабораторное оборудование ведущих мировых производителей. Это позволяет ставить точные диагнозы быстро и без очередей.</p><Link to="/inpatient" className="btn btn-primary" style={{marginTop:'16px', padding:'10px 24px'}}>Подробнее →</Link></div>
            </div>
            <div className="about-card">
              <img src="https://images.pexels.com/photos/5998472/pexels-photo-5998472.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Коллектив врачей" style={{width:'100%', height:'260px', objectFit:'cover'}} />
              <div className="about-card-content"><h3>Опытные врачи</h3><p>В нашем центре работают специалисты с опытом от 10 лет, кандидаты и доктора медицинских наук. Каждому пациенту гарантировано внимательное отношение и индивидуальный подход к лечению.</p><Link to="/doctors" className="btn btn-primary" style={{marginTop:'16px', padding:'10px 24px'}}>Наши врачи →</Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* Отзывы - как в вашем index.html */}
      <section className="section-light">
        <div className="container">
          <h2>Отзывы наших пациентов</h2>
          <div className="reviews-grid">
            <div className="review-card"><i className="fas fa-quote-left"></i><p className="review-text">«Очень внимательный персонал, современные палаты. Лежала в стационаре после операции — всё прошло отлично. Спасибо врачам!»</p><div className="review-author"><img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Анна" /><div><strong>Анна К.</strong><br />Москва</div></div></div>
            <div className="review-card"><i className="fas fa-quote-left"></i><p className="review-text">«Отличный диагностический центр. Сделал МРТ и консультацию кардиолога в один день. Быстро, профессионально, без очередей.»</p><div className="review-author"><img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Дмитрий" /><div><strong>Дмитрий П.</strong><br />Санкт-Петербург</div></div></div>
            <div className="review-card"><i className="fas fa-quote-left"></i><p className="review-text">«Круглосуточная помощь — это очень важно. Обращались ночью с ребенком, приняли сразу. Спасибо за профессионализм и заботу!»</p><div className="review-author"><img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Екатерина" /><div><strong>Екатерина М.</strong><br />Казань</div></div></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;