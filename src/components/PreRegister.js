import React, { useEffect, useState } from "react";
import "./PreRegister.css";
import yoyoLogo from "../assets/Logo YOYO.png";
import logo from "../assets/Icon_Tooltip.png";
import yoyovideoMobile from "../assets/YOYO_VID_01.webm";
import yoyovideoDesktop from "../assets/yoyo16.mp4";
import Tooltip from "./tooltip";

function PreRegister() {

    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage("Please complete all fields");
      setMessageType("error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    const age = parseInt(formData.age, 10);
    if (isNaN(age) || age < 18 || age > 100) {
      setMessage("Please enter a valid age between 18 and 100");
      setMessageType("error");
      return;
    }

    const mobileRegex = /^\d{7,15}$/; // Simple regex for mobile number
    if (!mobileRegex.test(formData.mobile)) {
      setMessage("Please enter a valid mobile number (7-15 digits)");
      setMessageType("error");
      return;
    }

    const instagramRegex = /^@?(\w){1,30}$/; // Simple regex for Instagram handle
    if (!instagramRegex.test(formData.instagram)) {
      setMessage("Please enter a valid Instagram handle");
      setMessageType("error");
      return;
    }

    // Debounce - prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(
        process.env.REACT_APP_PRE_REGISTRATION_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            age: formData.age,
            email: formData.email,
            mobile_number: formData.mobile,
            city: formData.city,
            instagram: formData.instagram,
            country: formData.country,
            work: formData.work,
            favorite_spots: formData.favorite_spots,
          }),
        },
      );

      if (response.ok) {
        setMessage("Registration successful! Thank you for signing up.");
        setMessageType("success");
        setFormData({
          name: "",
          age: "",
          email: "",
          mobile: "",
          instagram: "",
          country: "",
          work: "",
          favorite_spots: "",
          city: "",
        });

        // Re-enable submit button after 3 seconds
        setTimeout(() => {
          setIsSubmitting(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        if (errorData.message.email) {
          setMessage(errorData.message.email);
        } else {
          if (errorData.message.mobile_number) {
            setMessage(errorData.message.mobile_number);
          } else {
            setMessage("Registration error. Please try again.");
          }
        }

        setMessageType("error");
        // Re-enable submit button after 2 seconds on error
        setTimeout(() => {
          setIsSubmitting(false);
        }, 2000);
      }
    } catch (error) {
      setMessage("Connection Error. Try again later.");
      setMessageType("error");
      // Re-enable submit button after 2 seconds on error
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <div className="App">
      <div className="videoOpacity" style={{ zIndex: "0", opacity: 1 }}></div>
      <div className="videoContainer">
        <div className="videoOpacity"></div>
        <video
          id="videoID"
          playsInline
          autoPlay
          muted
          loop
          webkit-playsinline="true"
          className="videoBody"
        >
          <source src={isMobile ? yoyovideoMobile : yoyovideoDesktop} type={isMobile ? "video/webm" : "video/mp4"} />
        </video>
      </div>

      <div className="bodyContainer">
        <><div className="spacer"></div></>
        <div className="mainContainer">
          <img
            src={yoyoLogo}
            className="yoyoLogo"
            style={{ paddingBottom: "0px" }}
            alt="YoYo Logo"
          />
        {!isMobile ? <p
            className="yoyoTitle2"
            style={{ paddingBottom: "10px", paddingTop: "20px" }}
          >
            YoYo Membership | Pre-Sign Up
          </p> : <><p
            className="yoyoTitle2"
            style={{ paddingBottom: "10px", paddingTop: "20px" }}
          >
            YoYo Membership
          </p>
          <p
            className="yoyoTitle2"
            style={{ paddingBottom: "10px", paddingTop: "0px" }}
          >
            Pre-Sign Up
          </p></>}
          
          <form
            className="preregister-form"
            style={{ overflow: "visible" }}
            onSubmit={handleSubmit}
            novalidate
            noValidate
          >
            <div className="form-group" style={{ overflow: "visible" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  overflow: "visible",
                }}
              >
                <p className="formtitle">Your full name</p>
                <Tooltip
                  src={logo}
                  alt="info icon"
                  text="Exactly as it appears on your official ID. This keeps your membership seamless and secure."
                />
              </div>

              <input
                autocomplete="off"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group" style={{ overflow: "visible" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  overflow: "visible",
                }}
              >
                <p className="formtitle">Your age</p>
                <Tooltip
                  positionX="-40%"
                  src={logo}
                  alt="info icon"
                  text="Certain experiences are age-gated by design."
                />
              </div>
              <input
                type="number"
                id="age"
                name="age"
                  autocomplete="off"
                value={formData.age}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group" style={{ overflow: "visible" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  overflow: "visible",
                }}
              >
                <p className="formtitle">Email address</p>
                <Tooltip
                  src={logo}
                  alt="info icon"
                  text="Where we’ll send your invite, updates, and anything you wouldn’t want to miss."
                />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                autocomplete="off"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group" style={{ overflow: "visible" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  overflow: "visible",
                }}
              >
                <p className="formtitle">Mobile number</p>
                <Tooltip
                  src={logo}
                  alt="info icon"
                  text="For priority access, confirmations, and time-sensitive drops."
                />
              </div>
              <input
              autocomplete="off"
                type="number"
                inputMode="numeric"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group" style={{ overflow: "visible" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  overflow: "visible",
                }}
              >
                <p className="formtitle">Instagram handle</p>
                <Tooltip
                  src={logo}
                  alt="info icon"
                  text="Public profile preferred. It helps us understand your world, taste, and energy."
                />
              </div>
              <input
              autocomplete="off"
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group" style={{ overflow: "visible" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  overflow: "visible",
                }}
              >
                <p className="formtitle">Country of residence</p>
                <Tooltip
                  src={logo}
                  alt="info icon"
                  text="YoYo experiences adapt by location."
                />
              </div>
              <input
              autocomplete="off"
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group" style={{ overflow: "visible" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  overflow: "visible",
                }}
              >
                <p className="formtitle">City</p>
                <Tooltip
                  positionX="-30%"
                  src={logo}
                  alt="info icon"
                  text="So we know where to meet you."
                />
              </div>
              <input
                autocomplete="off"
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group" style={{ overflow: "visible" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  overflow: "visible",
                }}
              >
                <p className="formtitle">What do you do?</p>
                <Tooltip
                  src={logo}
                  alt="info icon"
                  text="Your role, industry, or main creative lane. Titles are optional — clarity is not."
                />
              </div>
              <input
                autocomplete="off"
                type="text"
                id="work"
                name="work"
                value={formData.work}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group" style={{ overflow: "visible" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  overflow: "visible",
                }}
              >
                <p className="formtitle">Your usual spots (upt to 3)</p>
                <Tooltip
                  src={logo}
                  alt="info icon"
                  text="Bars, restaurants, or places you genuinely go back to. This helps us curate experiences that feel natural to you."
                />
              </div>
              <input
                autocomplete="off"
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
              <div className={`message ${messageType}`}>{message}</div>
            )}

            <p
              className="formtitle"
              style={{
                textAlign: "center",
                fontSize: "15px",
                paddingTop: "30px",
                paddingBottom: "30px",
              }}
            >
              Every YoYo membership is reviewed by a human team. We’ll be in touch.
            </p>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Application"}
            </button>
          </form>
        </div>

        <div>
          <div
            className="textFooterContainer"
            style={{
              width: "100%",
              gap: "10px",
              paddingBottom: "64px",
              paddingTop: "32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <a
              style={{ fontSize: "15px", textAlign: "center" }}
              href="https://www.google.com"
              className="textFotterLink"
            >
              Privacy Policy
            </a>
            <p
              className="textFotter"
              style={{ fontSize: "15px", textAlign: "center" }}
            >
              YOYO© All Rights Reserved 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreRegister;
