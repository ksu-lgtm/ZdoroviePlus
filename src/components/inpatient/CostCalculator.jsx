import React, { useState, useEffect } from 'react';

const CostCalculator = ({ selectedRoom, onCostChange }) => {
  const [admissionDate, setAdmissionDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [roomType, setRoomType] = useState('8500');
  const [totalCost, setTotalCost] = useState(0);

  const roomPrices = {
    '8500': { name: 'Стандарт', price: 8500 },
    '12000': { name: 'Одноместная', price: 12000 },
    '24000': { name: 'VIP', price: 24000 }
  };

  useEffect(() => {
    if (admissionDate && dischargeDate) {
      const start = new Date(admissionDate);
      const end = new Date(dischargeDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (days > 0) {
        const price = roomPrices[roomType].price;
        const cost = days * price;
        setTotalCost(cost);
        onCostChange && onCostChange(cost);
      } else {
        setTotalCost(0);
        onCostChange && onCostChange(0);
      }
    } else {
      setTotalCost(0);
      onCostChange && onCostChange(0);
    }
  }, [admissionDate, dischargeDate, roomType]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="calculator">
      <div className="form-row">
        <div className="form-group">
          <label>Дата поступления</label>
          <input 
            type="date" 
            min={today}
            value={admissionDate} 
            onChange={(e) => setAdmissionDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Дата выписки</label>
          <input 
            type="date" 
            min={admissionDate || today}
            value={dischargeDate} 
            onChange={(e) => setDischargeDate(e.target.value)}
            required
          />
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
    </div>
  );
};

export default CostCalculator;