import "./App.css";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import { Route, Routes, Router, useHistory } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import "./variables.css";
import LoginPage from "./authorization/LoginPage1";
import RegisterPage from "./authorization/RegisterPage";
// import SalonProfile from './components/SalonProfile/SalonProfile';
import MasterProfile from "./salon/MasterProfile/MasterProfile";
import ReservationForm from "./components/ReservationForm/ReservationForm";
import ServiceWidget from "./components/ServiceWidget/ServiceWidget";
import ClientHome from "./pages/ClientHome";
import BookingTable from "./components/BookingTable/BookingTable";
import Experimental from "./pages/Experimental/Experimental";
import Settings from "./pages/Settings";
import BentoboxMenu from "./components/BentoboxMenu/BentoboxMenu";
import Profile from "./salon/Profile";
import WebApp from "@twa-dev/sdk";
import PrettyJson from "./devutils/PrettyJson";
import ManagerSchedule from "./schedules/ManagerSchedule";
import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import WeatherApp from "./testComponents/WeatherApp";
import Page from "./main_page/Page";
import SampleFetching from "./testComponents/SampleFetching";
import ServicePage from "./components/BookingPages/ServicePage";
import ClientAppointments from "./pages/ClientAppointments";
import MasterSetup from "./authorization/MasterSetup";
import SchedulePlanner from "./components/SchedulePlanner";
import PlannerApp from "./pages/PlannerApp";
// <Route path={'/service'} element={<SalonProfile><ProductList /><ReservationForm></ReservationForm></SalonProfile>}></Route>

function App() {
  const queryParameters = new URLSearchParams(window.location.search);
  const master = queryParameters.get("master");
  console.log("master" + master);

  return (
    <div className="App">
      <Header />
      {/*WebApp && <PrettyJson json={WebApp?.WebAppUser}/>*/}

      <Suspense fallback={<div>Loading...</div>}>
        <ConfigProvider locale={ruRU}>
          <Routes>
            {/* общая */}
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"/sample"} element={<SampleFetching />} />
            <Route path={"/schedule"} element={<SchedulePlanner />} />
            <Route path={"/planner"} element={<PlannerApp />} />
            {/* менеджер */}
            <Route path={"manager/dashboard"} element={<ManagerSchedule />} />
            <Route path={"/fast_book"} element={<ManagerSchedule />}></Route>
            <Route path={"/salon_register"} element={<ServiceWidget />}></Route>
            {/* мастер */}
            <Route path={"/master/:id"} element={<MasterProfile />}></Route>
            <Route path={"/master/login"} element={<MasterSetup />}></Route>
            {/* клиентская сторона */}
            <Route path={"/page"} element={<Page />}></Route>
            <Route path={"/home"} element={<ClientHome />}></Route>
            <Route index element={<ClientHome />} />
            <Route path={"/client/appointments"} element={<ClientAppointments />}></Route>
            <Route path={"/booking"} element={<BookingTable />}></Route>
            <Route path={"/form"} element={<Form />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/service/:id"} element={<ServicePage />}></Route>
            
            
            
            <Route path={"/sandbox"} element={<Experimental />}></Route>
            <Route path={"/settings"} element={<Settings />}></Route>
            <Route path={"/bento"} element={<BentoboxMenu />}></Route>
            <Route path={"/master"} element={<MasterProfile />}></Route>
            {/*test directories*/}
            <Route path={"/weather"} element={<WeatherApp />}></Route>
          </Routes>
        </ConfigProvider>
      </Suspense>
    </div>
  );
}

export default App;

// git add .
// git commit -m "commit name"
// git push

// import './App.css';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { Fragment } from 'react';

// import OtherPage from './OtherPage';
// import MainComponent from './MainComponent';

// function App() {
//   return (
//     <Router>
//       <Fragment>
//         <header>
//           <div>This is a multicontainer Application</div>
//           <Link to="/">Home</Link>
//           <Link to="/otherPage">Other Page</Link>
//         </header>
//         <div>
//           <Routes>
//             <Route exact path="/" element={<MainComponent />} />
//             <Route exact path="/otherPage" element={<OtherPage />} />
//           </Routes>
//         </div>
//       </Fragment>

//     </Router>
//   );
// }

// export default App;
