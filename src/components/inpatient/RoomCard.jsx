import React from 'react';

const RoomCard = ({ room, onBook }) => {
  const getIcon = (feature) => {
    return '<i class="fas fa-check" style="color: var(--secondary); margin-right: 8px;"></i>';
  };

  return (
    <div className="room-card">
      <img className="room-img" src={room.image} alt={room.name} />
      <div className="room-body">
        <div className="room-name">{room.name}</div>
        <div className="room-price">{room.price.toLocaleString()} ₽/сутки</div>
        <ul className="room-features">
          {room.features.map((feature, index) => (
            <li key={index}>
              <i className="fas fa-check" style={{ color: 'var(--secondary)', marginRight: '8px' }}></i>
              {feature}
            </li>
          ))}
        </ul>
        <button className="btn-room" onClick={() => onBook(room)}>
          Забронировать
        </button>
      </div>
    </div>
  );
};

export default RoomCard;