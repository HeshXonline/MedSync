import React from 'react';

const KPIStat = ({ label, value, hint }) => {
  return (
    <div className="card kpi" aria-label={`KPI ${label}`}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {hint && <div className="kpi-hint">{hint}</div>}
    </div>
  );
};

export default KPIStat;

