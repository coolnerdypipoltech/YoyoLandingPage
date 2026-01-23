import React, { useState, useEffect, useRef } from "react";
import "./tooltip.css";

function Tooltip({ src, alt, text }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Close tooltip when clicking outside
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  const handleInteraction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={handleInteraction}
      onTouchEnd={handleInteraction}
      className="tooltip-container"
    >
      <img src={src} alt={alt} className="tooltip-icon" />
      {isVisible && (
        <div className="tooltip-box">
          <div className="tooltip-text">{text}</div>
        </div>
      )}
    </div>
  );
}

export default Tooltip;
