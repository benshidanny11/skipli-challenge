import React, { useState } from "react";
import axios from "axios";
import APIS from "../../constants/APIS";
import { useNavigate } from "react-router-dom";
import phoneIcon from "../../assets/images/phone-icon.png"

function PhoneVerification() {
  const [phonenumber, setPhonenumber] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [activeInput,setActiveInput]=useState("phone-input");
  const [codeVelificationResponse, setCodeVelificationResponse] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [validatingCode, setValidatingCode] = useState(false);
  const navigate = useNavigate();
  const sendAccessCode = async (e) => {
    e.preventDefault();
    if (phonenumber.length === 0) {
      alert("Enter valid phone number");
      return;
    }

    setSendingCode(true);

     await axios.post(APIS.SEND_ACCESS_CODE, {
      phoneNumber: phonenumber,
    });
    setSendingCode(false);
    setActiveInput('accesscode-input');
  };

  const validateAccessCode = async (e) => {
    e.preventDefault();
    if (accessCode.length === 0) {
      alert("Please provide acess code.");
      return;
    }

    setValidatingCode(true);
    try {
      const response = await axios.post(APIS.VALIDATE_ACCESS_CODE, {
        phoneNumber: phonenumber,
        accessCode: accessCode,
      });

      if (response.data.success) {
        setCodeVelificationResponse("Verified successfully");
        setIsCodeValid(true);
        
        setTimeout(() => navigate("/"), 800);
        localStorage.setItem("phonenumber",phonenumber);
      }
      setValidatingCode(false);
    } catch (err) {
      setCodeVelificationResponse("Invalid verification code");
      setValidatingCode(false);
      setIsCodeValid(false);
    }
  };

  return (
    <div className="verification-form-container">
      <div className="form-container">
        <div className="img-container">
            <img src={phoneIcon} alt="Phone icon" width="100"/>
        </div>
        <h3 className="title-text">Verify your phone number</h3>
        <form>
         {activeInput ==='phone-input'? <div className="form-group">
            <label htmlFor="phonenumber">
              Phone number {" (Start with +)"}
            </label>
            <input
              type="tel"
              autoComplete="on"
              placeholder="Enter phone number"
              onChange={(e) => setPhonenumber(e.target.value)}
              value={phonenumber}
              className="form-text"
            />
            <button onClick={sendAccessCode} disabled={sendingCode} className="form-button">
              {sendingCode ? "Please wait" : "Send access code"}
            </button>
          </div>:<div className="form-group">
            <label htmlFor="accesscode">
              Access code {" (check your message)"}
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="Access code"
              onChange={(e) => setAccessCode(e.target.value)}
              className="form-text"
              value={accessCode}
            />
            <button onClick={validateAccessCode} disabled={validatingCode} className="form-button">
              {validatingCode ? "Please wait" : "Verify code"}
            </button>
            <p className="p-resend">Didn't receive code? <span className="resend" onClick={((e)=>setActiveInput('phone-input'))}>Resend</span></p>
            <p className={isCodeValid?"p-display-success":"p-display-error"}>
              {codeVelificationResponse}
            </p>
          </div>}
          
        </form>
      </div>
    </div>
  );
}

export default PhoneVerification;
