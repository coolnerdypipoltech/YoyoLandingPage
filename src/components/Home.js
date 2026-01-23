import React from "react";
import logo from "../assets/Rabbit_icon_OFF@2x.png";
import yoyoLogo from "../assets/Logo YOYO.png";
import yoyovideo from "../assets/YOYO_VID_01.webm";
import iconweb from "../assets/Icon_web_rabbitred.png";
import { useNavigate } from "react-router";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="videoOpacity" style={{ zIndex: "-2", opacity: 1 }}></div>
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
          <source src={yoyovideo} type="video/webm" />
        </video>
      </div>
      

      <div className="bodyContainer">
        <div className="spacer"></div>
        <div className="mainContainer">
          <img src={yoyoLogo} className="yoyoLogo" alt="YoYo Logo" />
          <p className="yoyoTitle">You've Seen The Rabbit</p>
          <p className="yoyoSubtitle">
            Follow it into Mexico City's hidden scene of experiences, nightlife
            and rewards.
          </p>
          <img src={iconweb} className="yoyoRabbit" alt="Rabbit Icon"></img>
        </div>
        <div className="footerContainer">
          <p className="cnpSubtitle">By</p>
          <img src={logo} className="cnpIcon" alt="CNP Icon"></img>
          <button onClick={() => navigate("/presignup")} className="submit-button" style={{ width: "200px" }}>
            Pre-Sign Up
          </button>
          <div className="textFooterContainer" style={{ paddingTop: "20px" }}>
            <p className="textFotter">YOYO© All Rights Reserved 2026</p>
            <a href="https://www.google.com" className="textFotterLink">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
