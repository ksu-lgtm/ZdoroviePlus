import React, { useState } from 'react';

const HospitalizationModal = ({ isOpen, onClose, room, onSuccess }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    admissionDate: '',
    dischargeDate: '',
    complaints: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen || !room) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateDays = () => {
    if (formData.admissionDate && formData.dischargeDate) {
      const start = new Date(formData.admissionDate);
      const end = new Date(formData.dischargeDate);
      return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      alert('Пожалуйста, войдите в систему для оформления госпитализации');
      window.location.href = '/login';
      return;
    }

    if (!formData.patientName || !formData.patientPhone || !formData.admissionDate || !formData.dischargeDate) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const days = calculateDays();
    if (days <= 0) {
      alert('Дата выписки должна быть позже даты поступления');
      return;
    }

    setLoading(true);

    const totalCost = days * room.price;

    const newHospitalization = {
      id: Date.now(),
      userId: currentUser.id,
      patientName: formData.patientName,
      patientPhone: formData.patientPhone,
      patientEmail: formData.patientEmail,
      roomType: room.name,
      roomPrice: room.price,
      admissionDate: formData.admissionDate,
      dischargeDate: formData.dischargeDate,
      totalDays: days,
      totalCost: totalCost,
      complaints: formData.complaints,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const hospitalizations = JSON.parse(localStorage.getItem('hospitalizations')) || [];
    hospitalizations.push(newHospitalization);
    localStorage.setItem('hospitalizations', JSON.stringify(hospitalizations));

    setLoading(false);
    alert(`Заявка на госпитализацию отправлена! Предварительная стоимость: ${totalCost.toLocaleString()} ₽`);
    
    setFormData({
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      admissionDate: '',
      dischargeDate: '',
      complaints: ''
    });
    onClose();
    if (onSuccess) onSuccess();
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h3 style={{ marginBottom: '20px' }}>Бронирование палаты</h3>
        
        <div style={{ 
          background: '#e8f4f8', 
          padding: '12px', 
          borderRadius: '12px', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <strong>{room.name}</strong><br />
          <span style={{ color: 'var(--primary)' }}>{room.price.toLocaleString()} ₽/сутки</span>
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
          <div className="form-row">
            <div className="form-group">
              <label>Дата поступления *</label>
              <input
                type="date"
                name="admissionDate"
                min={today}
                value={formData.admissionDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Дата выписки *</label>
              <input
                type="date"
                name="dischargeDate"
                min={formData.admissionDate || today}
                value={formData.dischargeDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <textarea
            name="complaints"
            rows="3"
            placeholder="Диагноз / Жалобы (необязательно)"
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

export default HospitalizationModal;