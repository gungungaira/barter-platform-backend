import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./Registration/registration";
import { login } from "./Authentication/auth";
// import AddSkills from './Profile/addSkills'
import LoginPage from './login-page/login'
import MySkill from './Profile/mySkills'
import Profile from './Profile/profile'
import FindMatch from "./Home/find_match";
import Requests from "./Home/requestMatch";
import Footer from "./Footer/footer";
import Welcome from './Home/welcome'
import ViewProfile from './Home/viewProfile'
import Friends from './Home/friends'
import Messages from './Home/messages'
import Inbox from './Home/inbox'



const Home = lazy(() => import("./Home/home"));
const Navbar = lazy(() => import("./NAVBAR/navbar"));
const Request = lazy(() => import("./NAVBAR/request"));
const CreateProfile = lazy(() => import("./Profile/createProfile"));
const AddSkills = lazy(() => import("./Profile/addSkills"));


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(login({ token }));
    }
  }, [dispatch]);

  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const token = localStorage.getItem("token");

    if (!isAuthenticated && !token) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense
          fallback={
            <h1 style={{ fontSize: "12px" }}>
              my lazy{" "}
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                loading..
              </span>
            </h1>
          }
        >
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/setProfile" element={<CreateProfile />} />
            <Route path="/addSkills" element={<AddSkills />} />
            <Route path="/request" element={<Request />} />
            <Route path='/mySkill' element={<MySkill/>} />
            <Route path='/profile' element={<Profile/>}/>
             <Route path='/findMatch' element={<FindMatch/>}/>
              <Route path='/requests' element={<Requests/>}/>
              <Route path='/footer' element={<Footer/>}/>
              <Route path='/welcome' element={<Welcome/>}/>
              <Route path='/profile/:id' element={<ViewProfile/>}/>
              <Route path='/friends' element={<Friends/>}/>
              <Route path='/messages/:friendId' element={<Messages/>}/>
              <Route path='/inbox' element={<Inbox/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;