import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/cnp_gris.png";
import yoyoLogo from "../assets/Logo YOYO.png";
import yoyovideoMobile from "../assets/YOYO_VID_01.webm";
import yoyovideoDesktop from "../assets/yoyo16.mp4";
import iconweb from "../assets/Icon_web_rabbitred.png";
import { useNavigate } from "react-router";
function Home() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  
  // Detectar si es móvil
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = true;
          await videoRef.current.play();
        } catch (error) {
          console.log("Autoplay prevented:", error);
          // Try to play on user interaction
          const playOnInteraction = () => {
            videoRef.current?.play();
            document.removeEventListener("touchstart", playOnInteraction);
            document.removeEventListener("click", playOnInteraction);
          };
          document.addEventListener("touchstart", playOnInteraction);
          document.addEventListener("click", playOnInteraction);
        }
      }
    };
    playVideo();
  }, []);
  return (
    <div className="App">
      <div className="videoOpacity" style={{ zIndex: "0", opacity: 1 }}></div>
      <div className="videoContainer">
        <div className="videoOpacity"></div>
        <video
          ref={videoRef}
          id="videoID"
          muted
          playsInline
          autoPlay
          loop
          webkit-playsinline="true"
          className="videoBody"
        >
          <source src={isMobile ? yoyovideoMobile : yoyovideoDesktop} type={isMobile ? "video/webm" : "video/mp4"} />
        </video>
      </div>

      <div
        className="bodyContainer"
        style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", overflow: "overlay" }}
      >
        <div style={{ overflow: "visible"}}>
          <div className="spacer"></div>
          <div className="mainContainer">
            <img src={yoyoLogo} className="yoyoLogo" alt="YoYo Logo" />
            <p className="yoyoTitle">You’ve Seen The Rabbit </p>

            <p className="yoyoSubtitle2" style={{}}>
              Follow it into Mexico City’s hidden scene of experiences,
              nightlife and culture.
            </p>

            <img src={iconweb} className="yoyoRabbit" alt="Rabbit Icon"></img>
            <button
              onClick={() => navigate("/presignup")}
              className="submit-button"
              style={{ width: "200px" }}
            >
              Membership Pre-Sign Up
            </button>
          </div>
        </div>

        <div className="footerContainer" style={{overflow: "visible"}}>
          <p className="cnpSubtitle" style={{color: "#6E6E6E"}}>By</p>
          <img src={logo} className="cnpIcon" alt="CNP Icon"></img>

          <div className="textFooterContainer" style={{ paddingTop: "20px" }}>
            <p className="textFotter">YOYO© All Rights Reserved 2026</p>
            <a href="https://www.google.com" className="textFotterLink">
              Privacy Policy
            </a>
          </div>
          {window.innerHeight < 840 ? <div style={{minHeight: "20px"}}></div> :  null}
        </div>
      </div>
    </div>
  );
}

export default Home;
