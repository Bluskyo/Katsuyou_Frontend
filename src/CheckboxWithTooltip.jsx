import React, { useState } from 'react';

function CheckboxWithTooltip({ id, label, tooltipText, onChange }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="checkbox-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <input type="checkbox" id={id} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
      {showTooltip && <div className="tooltip">{tooltipText}</div>}
    </div>
  );
}

export default CheckboxWithTooltip;
