import React from 'react';

const steps = [
  { icon: "fas fa-phone-alt", title: "Заявка", desc: "По телефону или на сайте" },
  { icon: "fas fa-stethoscope", title: "Осмотр врача", desc: "Первичная консультация" },
  { icon: "fas fa-bed", title: "Размещение", desc: "Заселение в палату" },
  { icon: "fas fa-heart", title: "Лечение и выписка", desc: "Полный курс лечения" }
];

const ProcessSteps = () => {
  return (
    <div className="process-steps">
      {steps.map((step, index) => (
        <div key={index}>
          <div className="step-circle">
            <i className={step.icon}></i>
          </div>
          <div className="step-title">{step.title}</div>
          <div className="step-desc">{step.desc}</div>
        </div>
      ))}
    </div>
  );
};

export default ProcessSteps;