// import "./App.css";
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

// import CreateBlog from "./Components/features/Settings/CreateBlog";

import Profile from "./pages/Home/Profile";

import Home from "./pages/Home/Home";

import Login from "./pages/Auth/Login/Login";

import Signup from "./pages/Auth/Signup/Signup";
import { useAppSelector } from "./hooks/hooks";
import { RootState } from "./redux/Store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


function App() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  console.log("🚀 ~ file: App.tsx:25 ~ App ~ data:", user);
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   if(!data){

  //   }
  // },[dispatch,data])
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={user? <Home/>:<Navigate to="/login"/>} />
          <Route path="/login" element={!user?<Login />:<Navigate to='/'/>} />
          <Route path="/profile" element={user ? <Profile/>:<Navigate to="/"/>}/>
          <Route path="/signup" element={!user ? <Signup/>:<Navigate to="/"/>}/>
        </Routes>
      </Router>
      {/* <Signup /> */}
      {/* <Login/> */}
      {/* <Home /> */}
      {/* <Profile /> */}
      {/* <CreateBlog /> */}
    </>
  );
}

export default App;
