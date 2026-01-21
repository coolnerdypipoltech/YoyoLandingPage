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
      setMessage('Please complete all fields');
      setMessageType('error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    const age = parseInt(formData.age, 10);
    if (isNaN(age) || age < 18 || age > 100) {
      setMessage('Please enter a valid age between 18 and 100');
      setMessageType('error');
      return;
    }

    const mobileRegex = /^\d{7,15}$/; // Simple regex for mobile number
    if (!mobileRegex.test(formData.mobile)) {
      setMessage('Please enter a valid mobile number (7-15 digits)');
      setMessageType('error');
      return;
    }

    const instagramRegex = /^@?(\w){1,30}$/; // Simple regex for Instagram handle
    if (!instagramRegex.test(formData.instagram)) {
      setMessage('Please enter a valid Instagram handle');
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
          age: formData.age,
          email: formData.email,
          mobile: formData.mobile,
          instagram: formData.instagram,
          country: formData.country,
          work: formData.work,
          favorite_spots: formData.favorite_spots
        })
      });

      if (response.ok) {
        setMessage('Registration successful! Thank you for signing up.');
        setMessageType('success');
        setFormData({ name: '', age: '', email: '', mobile: '', instagram: '', country: '', work: '', favorite_spots: '' });
        
        // Re-enable submit button after 3 seconds
        setTimeout(() => {
          setIsSubmitting(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Registration error. Please try again.');
        setMessageType('error');
        // Re-enable submit button after 2 seconds on error
        setTimeout(() => {  
          setIsSubmitting(false);
        }, 2000);
      }
    } catch (error) {
      setMessage('Connection Error. Try again later.');
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
          <img src={yoyoLogo} className="yoyoLogo" style={{paddingBottom: "0px"}} alt="YoYo Logo" />
          <p className="yoyoSubtitle" style={{paddingBottom: "20px", fontSize: "14px"}}>Enter the hidden loop</p>
          <p className="yoyoTitle">YoYo Membership</p>
          <p className="yoyoSubtitle"style={{paddingBottom: "20px", fontSize: "18px"}}>Pre-Sign Up</p>

          <form className="preregister-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div style={{ display: "flex", flexDirection: "row", gap: "10px"}}> 
                <p className="formtitle">Your full name</p> 
                <img src={logo} alt="icon" style={{width: "20px", height: "20px", marginBottom: "5px"}}/>
              </div> 
              
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <div style={{ display: "flex", flexDirection: "row", gap: "10px"}}> 
                <p className="formtitle">Your age</p> 
                <img src={logo} alt="icon" style={{width: "20px", height: "20px", marginBottom: "5px"}}/>
              </div> 
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <div style={{ display: "flex", flexDirection: "row", gap: "10px"}}> 
                <p className="formtitle">Email address</p> 
                <img src={logo} alt="icon" style={{width: "20px", height: "20px", marginBottom: "5px"}}/>
              </div> 
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <div style={{ display: "flex", flexDirection: "row", gap: "10px"}}> 
                <p className="formtitle">Mobile number</p> 
                <img src={logo} alt="icon" style={{width: "20px", height: "20px", marginBottom: "5px"}}/>
              </div> 
              <input
                type="number"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <div style={{ display: "flex", flexDirection: "row", gap: "10px"}}> 
                <p className="formtitle">Instagram handle</p> 
                <img src={logo} alt="icon" style={{width: "20px", height: "20px", marginBottom: "5px"}}/>
              </div> 
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <div style={{ display: "flex", flexDirection: "row", gap: "10px"}}> 
                <p className="formtitle">Country of residence</p> 
                <img src={logo} alt="icon" style={{width: "20px", height: "20px", marginBottom: "5px"}}/>
              </div> 
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <div style={{ display: "flex", flexDirection: "row", gap: "10px"}}> 
                <p className="formtitle">What do you do?</p> 
                <img src={logo} alt="icon" style={{width: "20px", height: "20px", marginBottom: "5px"}}/>
              </div> 
              <input
                type="text"
                id="work"
                name="work"
                value={formData.work}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <div style={{ display: "flex", flexDirection: "row", gap: "10px"}}> 
                <p className="formtitle">Your usual spots (upt to 3)</p> 
                <img src={logo} alt="icon" style={{width: "20px", height: "20px", marginBottom: "5px"}}/>
              </div> 
              <input
                type="text"
                id="favorite_spots"
                name="favorite_spots"
                value={formData.favorite_spots}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            {message && (
              <div className={`message ${messageType}`}>
                {message}
              </div>
            )}

            <p className="formtitle" style={{textAlign: "center"}}>Every YoYo membership is reviewed by a human team. We'll be in touch.</p> 
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Application'}
            </button>
          </form>
        </div>

        <div >
          
          <div className="textFooterContainer" style={{width: "100%", gap: "10px", paddingBottom: "64px", paddingTop: "32px"}}>
            <a style={{fontSize: "14px", textAlign: "center"}} href="https://www.google.com" className="textFotterLink">Privacy Policy</a>
            <p className="textFotter" style={{fontSize: "16px", textAlign: "center"}}>YOYO© All Rights Reserved 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreRegister;
