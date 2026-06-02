import React from 'react';

const DoctorsFilters = ({ filters, setFilters }) => {
  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleSpecialtyChange = (e) => {
    setFilters({ ...filters, specialty: e.target.value });
  };

  const handleExperienceChange = (e) => {
    setFilters({ ...filters, experience: e.target.value });
  };

  return (
    <section className="filters-section">
      <div className="container">
        <div className="filters-row">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Поиск по имени врача..."
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="filter-group">
            <select value={filters.specialty} onChange={handleSpecialtyChange}>
              <option value="all">Все специализации</option>
              <option value="Терапевт">Терапевт</option>
              <option value="Хирург">Хирург</option>
              <option value="Невролог">Невролог</option>
              <option value="Кардиолог">Кардиолог</option>
              <option value="Педиатр">Педиатр</option>
              <option value="Офтальмолог">Офтальмолог</option>
            </select>
            <select value={filters.experience} onChange={handleExperienceChange}>
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
  );
};

export default DoctorsFilters;