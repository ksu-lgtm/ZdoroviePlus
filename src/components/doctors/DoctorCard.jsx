import React from 'react';

const DoctorCard = ({ doctor, onBook }) => {
  const getStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
    if (hasHalfStar) stars += '<i class="fas fa-star-half-alt"></i>';
    for (let i = 0; i < emptyStars; i++) stars += '<i class="far fa-star"></i>';
    
    return stars;
  };

  return (
    <div className="doctor-card">
      <div style={{ 
        width: '100%', 
        height: '220px', 
        background: 'linear-gradient(135deg, #e8f4f8, #d4e8f0)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <i className="fas fa-user-md" style={{ fontSize: '80px', color: 'var(--primary)' }}></i>
      </div>
      <div className="doctor-info">
        <div className="doctor-name">{doctor.name}</div>
        <div className="doctor-specialty">{doctor.specialty}</div>
        <div className="doctor-experience">
          <i className="fas fa-briefcase"></i> Стаж {doctor.experience} лет
        </div>
        <div className="rating" dangerouslySetInnerHTML={{ __html: getStarRating(doctor.rating) }}></div>
        <div style={{ fontSize: '14px', color: 'var(--gray)', marginBottom: '16px' }}>
          <i className="fas fa-graduation-cap"></i> {doctor.education || 'Высшая категория'}
        </div>
        <button className="btn-book" onClick={() => onBook(doctor)}>
          Записаться на приём
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;