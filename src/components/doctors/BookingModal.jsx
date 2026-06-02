import React, { useState } from 'react';

const BookingModal = ({ isOpen, onClose, doctor, onSuccess }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    appointmentDate: '',
    appointmentTime: '10:00',
    complaints: ''
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen || !doctor) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Проверяем авторизацию
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      alert('Пожалуйста, войдите в систему для записи к врачу');
      window.location.href = '/login';
      return;
    }

    if (!formData.patientName || !formData.patientPhone || !formData.appointmentDate) {
      alert('Пожалуйста, заполните ФИО, телефон и дату приёма');
      return;
    }

    setLoading(true);

    // Создаём новую запись
    const newAppointment = {
      id: Date.now(),
      userId: currentUser.id,
      patientName: formData.patientName,
      patientPhone: formData.patientPhone,
      patientEmail: formData.patientEmail,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      date: formData.appointmentDate,
      time: formData.appointmentTime,
      complaints: formData.complaints,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Сохраняем в localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    setLoading(false);
    alert(`Заявка отправлена! Мы свяжемся с вами для подтверждения записи к ${doctor.name}`);
    
    // Сбрасываем форму и закрываем модальное окно
    setFormData({
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      appointmentDate: '',
      appointmentTime: '10:00',
      complaints: ''
    });
    onClose();
    
    if (onSuccess) onSuccess();
  };

  // Получаем минимальную дату (сегодня)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h3 style={{ marginBottom: '20px' }}>Запись к врачу</h3>
        
        <div style={{ 
          background: '#e8f4f8', 
          padding: '12px', 
          borderRadius: '12px', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <strong>{doctor.name}</strong><br />
          <span style={{ color: 'var(--primary)' }}>{doctor.specialty}</span>, стаж {doctor.experience} лет
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="patientName"
            placeholder="Ваше ФИО *"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="patientPhone"
            placeholder="Телефон *"
            value={formData.patientPhone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="patientEmail"
            placeholder="Email"
            value={formData.patientEmail}
            onChange={handleChange}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input
              type="date"
              name="appointmentDate"
              min={today}
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />
            <select name="appointmentTime" value={formData.appointmentTime} onChange={handleChange}>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </select>
          </div>
          <textarea
            name="complaints"
            rows="3"
            placeholder="Опишите ваши жалобы (необязательно)"
            value={formData.complaints}
            onChange={handleChange}
          ></textarea>
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', padding: '14px', borderRadius: '40px', cursor: 'pointer' }}
            disabled={loading}
          >
            {loading ? 'Отправка...' : 'Отправить заявку'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;