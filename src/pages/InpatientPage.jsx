import React, { useState } from 'react';

const InpatientPage = () => {
  const [admissionDate, setAdmissionDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [roomType, setRoomType] = useState('8500');
  const [totalCost, setTotalCost] = useState(0);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [complaints, setComplaints] = useState('');

  const calcCost = () => {
    if (admissionDate && dischargeDate) {
      const start = new Date(admissionDate);
      const end = new Date(dischargeDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (days > 0) {
        const rate = parseInt(roomType);
        setTotalCost(days * rate + 500);
      } else {
        setTotalCost(0);
      }
    } else {
      setTotalCost(0);
    }
  };

  React.useEffect(() => {
    calcCost();
  }, [admissionDate, dischargeDate, roomType]);

  const checkAuth = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      if (window.confirm('Для оформления заявки необходимо войти в систему. Перейти на страницу входа?')) {
        window.location.href = '/login';
      }
      return false;
    }
    return currentUser;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = checkAuth();
    if (!currentUser) return;

    if (!patientName || !patientPhone || !admissionDate || !dischargeDate) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const days = Math.ceil((new Date(dischargeDate) - new Date(admissionDate)) / 86400000);
    const rate = parseInt(roomType);
    const total = days * rate + 500;
    const roomTypeText = roomType === '8500' ? 'Стандарт' : roomType === '12000' ? 'Одноместная' : 'VIP-апартаменты';

    const newHospitalization = {
      id: Date.now(),
      userId: currentUser.id,
      patientName: patientName,
      patientPhone: patientPhone,
      patientEmail: patientEmail,
      roomType: roomTypeText,
      admissionDate: admissionDate,
      dischargeDate: dischargeDate,
      totalCost: total,
      complaints: complaints,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const hospitalizations = JSON.parse(localStorage.getItem('hospitalizations')) || [];
    hospitalizations.push(newHospitalization);
    localStorage.setItem('hospitalizations', JSON.stringify(hospitalizations));

    alert('Заявка на госпитализацию отправлена! Администратор свяжется с вами.');
    
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setComplaints('');
    setAdmissionDate('');
    setDischargeDate('');
    setTotalCost(0);
  };

  const openModal = (label) => {
    const currentUser = checkAuth();
    if (!currentUser) return;
    alert(`Бронирование ${label}\nДля бронирования заполните форму ниже`);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Круглосуточный стационар</h1>
          <p>Комфортное пребывание и профессиональный уход 24/7. Современные палаты, качественное питание, внимательный персонал.</p>
        </div>
      </section>

      <div className="container section">
        <h2>Типы палат</h2>
        <div className="rooms-grid">
          <div className="room-card">
            <img className="room-img" src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80" alt="Стандарт" />
            <div className="room-body">
              <div className="room-name">Стандарт</div>
              <div className="room-price">8 500 ₽/сутки</div>
              <ul className="room-features">
                <li><i className="fas fa-check"></i> 2-местное размещение</li>
                <li><i className="fas fa-check"></i> Отдельный санузел</li>
                <li><i className="fas fa-check"></i> Телевизор, Wi-Fi</li>
                <li><i className="fas fa-check"></i> 5-разовое питание</li>
              </ul>
              <button className="btn-room" onClick={() => openModal('Стандарт')}>Забронировать</button>
            </div>
          </div>

          <div className="room-card">
            <img className="room-img" src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80" alt="Одноместная" />
            <div className="room-body">
              <div className="room-name">Одноместная</div>
              <div className="room-price">12 000 ₽/сутки</div>
              <ul className="room-features">
                <li><i className="fas fa-check"></i> 1-местное размещение</li>
                <li><i className="fas fa-check"></i> Санузел с душем</li>
                <li><i className="fas fa-check"></i> Телевизор, Wi-Fi</li>
                <li><i className="fas fa-check"></i> Холодильник, чайник</li>
                <li><i className="fas fa-check"></i> 5-разовое питание</li>
              </ul>
              <button className="btn-room" onClick={() => openModal('Одноместная')}>Забронировать</button>
            </div>
          </div>

          <div className="room-card">
            <img className="room-img" src="https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=600&q=80" alt="VIP" />
            <div className="room-body">
              <div className="room-name">VIP-апартаменты</div>
              <div className="room-price">24 000 ₽/сутки</div>
              <ul className="room-features">
                <li><i className="fas fa-check"></i> 1-местное размещение</li>
                <li><i className="fas fa-check"></i> Ванная с джакузи</li>
                <li><i className="fas fa-check"></i> Личный ассистент</li>
                <li><i className="fas fa-check"></i> Индивидуальное меню</li>
                <li><i className="fas fa-check"></i> Место для родственника</li>
              </ul>
              <button className="btn-room" onClick={() => openModal('VIP-апартаменты')}>Забронировать</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container section">
        <h2>Как поступить в стационар</h2>
        <div className="process-steps">
          <div><div className="step-circle"><i className="fas fa-phone-alt"></i></div><div className="step-title">Заявка</div><div className="step-desc">По телефону или на сайте</div></div>
          <div><div className="step-circle"><i className="fas fa-stethoscope"></i></div><div className="step-title">Осмотр врача</div><div className="step-desc">Первичная консультация</div></div>
          <div><div className="step-circle"><i className="fas fa-bed"></i></div><div className="step-title">Размещение</div><div className="step-desc">Заселение в палату</div></div>
          <div><div className="step-circle"><i className="fas fa-heart"></i></div><div className="step-title">Лечение и выписка</div><div className="step-desc">Полный курс лечения</div></div>
        </div>
      </div>

      <div className="container section">
        <h2>Рассчитайте стоимость госпитализации</h2>
        <div className="calc-wrap">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Дата поступления</label>
                <input type="date" min={today} value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Дата выписки</label>
                <input type="date" min={admissionDate || today} value={dischargeDate} onChange={(e) => setDischargeDate(e.target.value)} required />
              </div>
            </div>
            <div className="form-group">
              <label>Тип палаты</label>
              <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                <option value="8500">Стандарт — 8 500 ₽/сутки</option>
                <option value="12000">Одноместная — 12 000 ₽/сутки</option>
                <option value="24000">VIP — 24 000 ₽/сутки</option>
              </select>
            </div>
            <div className="cost-result">
              <span>Итого за курс:</span>
              <span className="cost-value">{totalCost.toLocaleString()} ₽</span>
            </div>
            <div className="form-group">
              <label>Ваше имя</label>
              <input type="text" placeholder="Иван Иванов" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Телефон</label>
                <input type="tel" placeholder="+7 (___) ___-__-__" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="mail@example.ru" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Жалобы / Диагноз</label>
              <textarea rows="3" placeholder="Опишите причину госпитализации..." value={complaints} onChange={(e) => setComplaints(e.target.value)}></textarea>
            </div>
            <button type="submit" className="btn-submit">Отправить заявку</button>
          </form>

          <div>
            <div className="info-block">
              <h4>Что входит в стоимость</h4>
              <ul className="info-list">
                <li><i className="fas fa-check"></i> Проживание в палате</li>
                <li><i className="fas fa-check"></i> 5-разовое лечебное питание</li>
                <li><i className="fas fa-check"></i> Ежедневный осмотр врача</li>
                <li><i className="fas fa-check"></i> Круглосуточный уход медсестёр</li>
                <li><i className="fas fa-check"></i> Wi-Fi, телевизор</li>
              </ul>
            </div>
            <div className="info-block">
              <h4>Способы оплаты</h4>
              <ul className="info-list">
                <li><i className="fas fa-check"></i> Наличные и карты</li>
                <li><i className="fas fa-check"></i> ОМС и ДМС</li>
                <li><i className="fas fa-check"></i> Рассрочка без %</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InpatientPage;