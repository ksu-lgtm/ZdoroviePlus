import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminPage = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [admissions, setAdmissions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '', experience: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setAdmissions(JSON.parse(localStorage.getItem('hospitalizations')) || []);
    setAppointments(JSON.parse(localStorage.getItem('appointments')) || []);
    
    const savedDoctors = localStorage.getItem('doctors');
    if (savedDoctors) {
      setDoctors(JSON.parse(savedDoctors));
    } else {
      const defaultDoctors = [
        { id: 1, name: "Анна Сергеевна Иванова", specialty: "Терапевт", experience: 12 },
        { id: 2, name: "Дмитрий Петрович Смирнов", specialty: "Хирург", experience: 18 }
      ];
      setDoctors(defaultDoctors);
      localStorage.setItem('doctors', JSON.stringify(defaultDoctors));
    }
    
    const savedRooms = localStorage.getItem('rooms');
    if (savedRooms) {
      setRooms(JSON.parse(savedRooms));
    } else {
      const defaultRooms = [
        { id: 1, name: "Стандарт", price: 8500, beds: 2, status: "free" },
        { id: 2, name: "Одноместная", price: 12000, beds: 1, status: "free" },
        { id: 3, name: "VIP", price: 24000, beds: 1, status: "occupied" }
      ];
      setRooms(defaultRooms);
      localStorage.setItem('rooms', JSON.stringify(defaultRooms));
    }
  };

  const updateStatus = (type, id, status) => {
    if (type === 'admission') {
      const updated = admissions.map(a => a.id === id ? { ...a, status } : a);
      setAdmissions(updated);
      localStorage.setItem('hospitalizations', JSON.stringify(updated));
    } else if (type === 'appointment') {
      const updated = appointments.map(a => a.id === id ? { ...a, status } : a);
      setAppointments(updated);
      localStorage.setItem('appointments', JSON.stringify(updated));
    }
  };

  const deleteDoctor = (id) => {
    if (window.confirm('Удалить врача?')) {
      const updated = doctors.filter(d => d.id !== id);
      setDoctors(updated);
      localStorage.setItem('doctors', JSON.stringify(updated));
    }
  };

  const addDoctor = (e) => {
    e.preventDefault();
    const doctor = {
      id: doctors.length + 1,
      name: newDoctor.name,
      specialty: newDoctor.specialty,
      experience: parseInt(newDoctor.experience)
    };
    const updated = [...doctors, doctor];
    setDoctors(updated);
    localStorage.setItem('doctors', JSON.stringify(updated));
    setShowDoctorModal(false);
    setNewDoctor({ name: '', specialty: '', experience: '' });
  };

  const toggleRoom = (id) => {
    const updated = rooms.map(r => 
      r.id === id ? { ...r, status: r.status === 'free' ? 'occupied' : 'free' } : r
    );
    setRooms(updated);
    localStorage.setItem('rooms', JSON.stringify(updated));
  };

  const stats = {
    admissions: admissions.length,
    appointments: appointments.length,
    doctors: doctors.length,
    freeRooms: rooms.filter(r => r.status === 'free').length
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <ul className="sidebar-menu">
          <li><a href="#" className={activeTab === 'dashboard' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}><i className="fas fa-tachometer-alt"></i> Панель управления</a></li>
          <li><a href="#" className={activeTab === 'admissions' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('admissions'); }}><i className="fas fa-hospital-user"></i> Заявки на госпитализацию</a></li>
          <li><a href="#" className={activeTab === 'appointments' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('appointments'); }}><i className="fas fa-calendar-check"></i> Записи к врачу</a></li>
          <li><a href="#" className={activeTab === 'doctors' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('doctors'); }}><i className="fas fa-user-md"></i> Врачи</a></li>
          <li><a href="#" className={activeTab === 'rooms' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('rooms'); }}><i className="fas fa-bed"></i> Палаты</a></li>
        </ul>
      </aside>

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <>
            <div className="stats-grid">
              <div className="stat-card"><h3>Заявки на госпитализацию</h3><div className="stat-number">{stats.admissions}</div></div>
              <div className="stat-card"><h3>Записи к врачу</h3><div className="stat-number">{stats.appointments}</div></div>
              <div className="stat-card"><h3>Врачи</h3><div className="stat-number">{stats.doctors}</div></div>
              <div className="stat-card"><h3>Свободных палат</h3><div className="stat-number">{stats.freeRooms}</div></div>
            </div>
            <div className="table-container"><h2>Последние заявки</h2><p>Выберите раздел в меню для управления</p></div>
          </>
        )}

        {activeTab === 'admissions' && (
          <div className="table-container">
            <h2>Заявки на госпитализацию</h2>
            <table>
              <thead><tr><th>ID</th><th>Пациент</th><th>Палата</th><th>Даты</th><th>Статус</th><th>Действия</th></tr></thead>
              <tbody>
                {admissions.map(a => (
                  <tr key={a.id}>
                    <td>{a.id}</td><td>{a.patientName}</td><td>{a.roomType}</td>
                    <td>{a.admissionDate} - {a.dischargeDate}</td>
                    <td><span className={`status-badge status-${a.status}`}>{a.status === 'pending' ? 'Ожидает' : a.status === 'confirmed' ? 'Подтверждено' : 'Завершено'}</span></td>
                    <td><button className="btn-sm btn-success" onClick={() => updateStatus('admission', a.id, 'confirmed')}>Подтвердить</button>
                    <button className="btn-sm btn-danger" onClick={() => updateStatus('admission', a.id, 'cancelled')}>Отклонить</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="table-container">
            <h2>Записи к врачу</h2>
            <table>
              <thead><tr><th>ID</th><th>Пациент</th><th>Врач</th><th>Дата</th><th>Статус</th><th>Действия</th></tr></thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a.id}>
                    <td>{a.id}</td><td>{a.patientName}</td><td>{a.doctorName}</td><td>{a.date}</td>
                    <td><span className={`status-badge status-${a.status}`}>{a.status === 'pending' ? 'Ожидает' : 'Подтверждено'}</span></td>
                    <td><button className="btn-sm btn-success" onClick={() => updateStatus('appointment', a.id, 'confirmed')}>Подтвердить</button>
                    <button className="btn-sm btn-danger" onClick={() => updateStatus('appointment', a.id, 'cancelled')}>Отклонить</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'doctors' && (
          <div className="table-container">
            <h2>Врачи <button className="btn-sm btn-primary-sm" style={{float:'right'}} onClick={() => setShowDoctorModal(true)}>+ Добавить</button></h2>
            <table>
              <thead><tr><th>ID</th><th>ФИО</th><th>Специализация</th><th>Стаж</th><th>Действия</th></tr></thead>
              <tbody>
                {doctors.map(d => (
                  <tr key={d.id}>
                    <td>{d.id}</td><td>{d.name}</td><td>{d.specialty}</td><td>{d.experience} лет</td>
                    <td><button className="btn-sm btn-danger" onClick={() => deleteDoctor(d.id)}>Удалить</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="table-container">
            <h2>Палаты</h2>
            <table>
              <thead><tr><th>ID</th><th>Название</th><th>Цена/сутки</th><th>Мест</th><th>Статус</th><th>Действия</th></tr></thead>
              <tbody>
                {rooms.map(r => (
                  <tr key={r.id}>
                    <td>{r.id}</td><td>{r.name}</td><td>{r.price} ₽</td><td>{r.beds}</td>
                    <td><span className={`status-badge ${r.status === 'free' ? 'status-confirmed' : 'status-pending'}`}>{r.status === 'free' ? 'Свободна' : 'Занята'}</span></td>
                    <td><button className="btn-sm btn-primary-sm" onClick={() => toggleRoom(r.id)}>Сменить статус</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {showDoctorModal && (
        <div className="modal" style={{display:'flex'}} onClick={(e) => e.target === e.currentTarget && setShowDoctorModal(false)}>
          <div className="modal-content">
            <span className="close-modal" onClick={() => setShowDoctorModal(false)}>&times;</span>
            <h3>Добавить врача</h3>
            <form onSubmit={addDoctor}>
              <input type="text" placeholder="ФИО" value={newDoctor.name} onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})} required />
              <input type="text" placeholder="Специализация" value={newDoctor.specialty} onChange={(e) => setNewDoctor({...newDoctor, specialty: e.target.value})} required />
              <input type="number" placeholder="Стаж (лет)" value={newDoctor.experience} onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})} required />
              <button type="submit" className="btn-success" style={{padding:'12px', width:'100%'}}>Добавить</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;