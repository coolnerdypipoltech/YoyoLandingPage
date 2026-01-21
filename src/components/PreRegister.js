import React, { useState } from 'react';
import './PreRegister.css';
import yoyoLogo from "../assets/Logo YOYO.png";
import logo from "../assets/Rabbit_icon_OFF@2x.png";
import yoyovideo from "../assets/YOYO_VID_01.webm";

function PreRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage('Por favor completa todos los campos');
      setMessageType('error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage('Por favor ingresa un correo válido');
      setMessageType('error');
      return;
    }

    // Debounce - prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('http://64.227.105.243/api/v1/pre-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email
        })
      });

      if (response.ok) {
        setMessage('¡Registro exitoso! Gracias por registrarte.');
        setMessageType('success');
        setFormData({ name: '', email: '' });
        
        // Re-enable submit button after 3 seconds
        setTimeout(() => {
          setIsSubmitting(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Error al registrar. Por favor intenta de nuevo.');
        setMessageType('error');
        // Re-enable submit button after 2 seconds on error
        setTimeout(() => {
          setIsSubmitting(false);
        }, 2000);
      }
    } catch (error) {
      setMessage('Error de conexión. Por favor intenta de nuevo.');
      setMessageType('error');
      // Re-enable submit button after 2 seconds on error
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <div className="App">
      <div className="videoContainer">
        <video id="videoID" playsInline autoPlay muted loop className="videoBody">
          <source src={yoyovideo} type="video/webm" />
        </video>
      </div>

      <div className="bodyContainer">
        <div className="mainContainer">
          <img src={yoyoLogo} className="yoyoLogo" alt="YoYo Logo" />
          <p className="yoyoTitle">Pre-registro</p>
          <p className="yoyoSubtitle">Únete a la experiencia YOYO</p>

          <form className="preregister-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre completo"
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            {message && (
              <div className={`message ${messageType}`}>
                {message}
              </div>
            )}

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Registrarse'}
            </button>
          </form>
        </div>

        <div className="footerContainer">
          <p className="cnpSubtitle">By</p>
          <img src={logo} className="cnpIcon" alt="CNP Icon" />
          <div className="textFooterContainer">
            <p className="textFotter">YOYO© All Rights Reserved 2025</p>
            <a href="https://www.google.com" className="textFotterLink">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreRegister;
