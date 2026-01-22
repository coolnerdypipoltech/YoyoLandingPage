import React, { useState } from 'react';
import './tooltip.css';

function Tooltip({ src, alt, text }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="tooltip-container">
      <img
        src={src}
        alt={alt}
        className="tooltip-icon"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      />
      {isVisible && (
        <div className="tooltip-box">
          <div className="tooltip-text">{text}</div>
        </div>
      )}
    </div>
  );
}

export default Tooltip;