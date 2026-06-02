import React, { useState } from 'react';

const doctorsData = [
  { id: 1, name: "Анна Сергеевна Иванова", specialty: "Терапевт", experience: 12, rating: 4.8 },
  { id: 2, name: "Дмитрий Петрович Смирнов", specialty: "Хирург", experience: 18, rating: 4.9 },
  { id: 3, name: "Елена Владимировна Козлова", specialty: "Невролог", experience: 10, rating: 4.7 },
  { id: 4, name: "Игорь Александрович Морозов", specialty: "Кардиолог", experience: 22, rating: 5.0 },
  { id: 5, name: "Мария Андреевна Соколова", specialty: "Терапевт", experience: 8, rating: 4.6 },
  { id: 6, name: "Алексей Викторович Попов", specialty: "Хирург", experience: 15, rating: 4.8 }
];

const DoctorsPage = () => {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const [expFilter, setExpFilter] = useState('all');

  const getStarRating = (rating) => {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars += '<i class="fas fa-star"></i>';
      else if (i === Math.floor(rating) + 1 && rating % 1 >= 0.5) stars += '<i class="fas fa-star-half-alt"></i>';
      else stars += '<i class="far fa-star"></i>';
    }
    return stars;
  };

  const filteredDoctors = doctorsData.filter(doc => {
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty = specialty === 'all' || doc.specialty === specialty;
    let matchExp = true;
    if (expFilter !== 'all') {
      if (expFilter === '0-5') matchExp = doc.experience <= 5;
      else if (expFilter === '5-10') matchExp = doc.experience > 5 && doc.experience <= 10;
      else if (expFilter === '10-20') matchExp = doc.experience > 10 && doc.experience <= 20;
      else if (expFilter === '20+') matchExp = doc.experience > 20;
    }
    return matchSearch && matchSpecialty && matchExp;
  });

  const openBooking = (doctorName, specialty) => {
    alert(`Запись к ${doctorName} (${specialty})\nФункция записи будет доступна после авторизации`);
  };

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Наши врачи</h1>
          <p>Опытные специалисты, готовые помочь вам 24/7. Выберите врача и запишитесь на приём.</p>
        </div>
      </section>

      <section className="filters-section">
        <div className="container">
          <div className="filters-row">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input type="text" id="searchInput" placeholder="Поиск по имени..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="filter-group">
              <select id="specialtyFilter" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                <option value="all">Все специализации</option>
                <option value="Терапевт">Терапевт</option>
                <option value="Хирург">Хирург</option>
                <option value="Невролог">Невролог</option>
                <option value="Кардиолог">Кардиолог</option>
              </select>
              <select id="experienceFilter" value={expFilter} onChange={(e) => setExpFilter(e.target.value)}>
                <option value="all">Любой стаж</option>
                <option value="0-5">до 5 лет</option>
                <option value="5-10">5–10 лет</option>
                <option value="10-20">10–20 лет</option>
                <option value="20+">более 20 лет</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="doctors-grid">
          {filteredDoctors.map(doc => (
            <div key={doc.id} className="doctor-card">
              <div style={{ width: '100%', height: '200px', background: 'linear-gradient(135deg, #e8f4f8, #d4e8f0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-user-md" style={{ fontSize: '80px', color: 'var(--primary)' }}></i>
              </div>
              <div className="doctor-info">
                <div className="doctor-name">{doc.name}</div>
                <div className="doctor-specialty">{doc.specialty}</div>
                <div className="doctor-experience"><i className="fas fa-briefcase"></i> Стаж {doc.experience} лет</div>
                <div className="rating" dangerouslySetInnerHTML={{ __html: getStarRating(doc.rating) }}></div>
                <button className="btn-book" onClick={() => openBooking(doc.name, doc.specialty)}>Записаться</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DoctorsPage;