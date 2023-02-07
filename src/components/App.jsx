import PhoneVerification from "./pages/PhoneVerification";
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/main.css';
import key from 'uniqid';
import Home from "./pages/Home";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate=useNavigate();
  const myPhoneNumber=localStorage.getItem("phonenumber");
  
  useEffect(()=>{
   if(myPhoneNumber){
    navigate("/")
   }else{
    navigate("/verifiphone")
   }
  },[myPhoneNumber, navigate])
  return (

    <Routes>
    <Route path="/" key={key()} element={<Home />}></Route>
    <Route path="/verifiphone" key={key()} element={<PhoneVerification />}></Route>
  
  </Routes>

  );
}

export default App;
