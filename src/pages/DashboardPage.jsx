import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [appointments, setAppointments] = useState([]);
  const [hospitalizations, setHospitalizations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      // Загрузка записей к врачу
      const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
      const userAppointments = allAppointments.filter(a => a.userId === currentUser.id);
      setAppointments(userAppointments);

      // Загрузка госпитализаций
      const allHospitalizations = JSON.parse(localStorage.getItem('hospitalizations')) || [];
      const userHospitalizations = allHospitalizations.filter(h => h.userId === currentUser.id);
      setHospitalizations(userHospitalizations);
    }
    setLoading(false);
  }, [currentUser]);

  // Получение данных пользователя
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userData = users.find(u => u.id === currentUser?.id);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      {/* Шапка как в оригинале */}
      <div className="dashboard-header">
        <div className="container">
          <h1>Личный кабинет</h1>
          <p><i className="fas fa-user-circle"></i> {currentUser?.name}</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="container">
          <div className="tabs">
            <button 
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Профиль
            </button>
            <button 
              className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              Мои записи
            </button>
            <button 
              className={`tab-btn ${activeTab === 'hospitalizations' ? 'active' : ''}`}
              onClick={() => setActiveTab('hospitalizations')}
            >
              Госпитализации
            </button>
          </div>

          {/* Профиль */}
          <div id="profile" className={`tab-content ${activeTab === 'profile' ? 'active' : ''}`}>
            <div className="card">
              <h3>Личные данные</h3>
              <div className="info-row">
                <span className="info-label">ФИО:</span>
                <span id="profileName">{userData?.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span id="profileEmail">{userData?.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Телефон:</span>
                <span id="profilePhone">{userData?.phone || 'не указан'}</span>
              </div>
            </div>
          </div>

          {/* Мои записи */}
          <div id="appointments" className={`tab-content ${activeTab === 'appointments' ? 'active' : ''}`}>
            <div className="card">
              <h3>Записи к врачу</h3>
              <div id="appointmentsList">
                {appointments.length === 0 ? (
                  <p>У вас пока нет записей. <a href="/doctors">Записаться</a></p>
                ) : (
                  appointments.map(a => (
                    <div key={a.id} className="appointment-item">
                      <div>
                        <strong>{a.doctorName}</strong><br />
                        <small>{a.date}</small>
                      </div>
                      <span className={`status-badge status-${a.status}`}>
                        {a.status === 'pending' ? 'Ожидает' : 'Подтверждено'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Госпитализации */}
          <div id="hospitalizations" className={`tab-content ${activeTab === 'hospitalizations' ? 'active' : ''}`}>
            <div className="card">
              <h3>История госпитализаций</h3>
              <div id="hospitalizationsList">
                {hospitalizations.length === 0 ? (
                  <p>У вас пока нет госпитализаций. <a href="/inpatient">Записаться</a></p>
                ) : (
                  hospitalizations.map(h => (
                    <div key={h.id} className="appointment-item">
                      <div>
                        <strong>{h.roomType}</strong><br />
                        <small>{h.admissionDate} — {h.dischargeDate}</small>
                      </div>
                      <span className={`status-badge status-${h.status}`}>
                        {h.status === 'pending' ? 'Ожидает' : 'Подтверждено'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;