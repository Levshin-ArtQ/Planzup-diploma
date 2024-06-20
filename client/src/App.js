import "./App.css";
import { lazy, Suspense } from "react";
import { useState, useEffect } from "react";
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
import ClientHome from "./4clients/ClientHome";
import BookingTable from "./components/BookingTable/BookingTable";
import Experimental from "./pages/Experimental/Experimental";
import Settings from "./common/Settings";
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
import ClientAppointments from "./4clients/ClientAppointments";
import MasterSetup from "./4admins/MasterSetup";
import SchedulePlanner from "./components/SchedulePlanner";
import PlannerApp from "./pages/PlannerApp";
import ClientCardsPage from "./4managers/ClientCardsPage";
import SalonPage from "./4clients/SalonPage";
import MasterPage from "./4clients/MasterPage";

import useApi from "./hooks/useApi";
import SampleSalon from "./testComponents/SampleSalon";
// <Route path={'/service'} element={<SalonProfile><ProductList /><ReservationForm></ReservationForm></SalonProfile>}></Route>

function App() {
  

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
            <Route path={"/register"} element={<RegisterPage />} />
            {/* админ */} 
            <Route path={"/salon/setup"} element={<MasterSetup />}></Route> 
            {/* менеджер */} 
            <Route path={"/fast_book"} element={<ManagerSchedule />}></Route> {/* календрь мб поменять */}
            <Route path={"/salon_register"} element={<ServiceWidget />}></Route>
            <Route path={'/clientbase'} element={<ClientCardsPage />}></Route>
            {/* мастер */}
            <Route path={"/master/profile/:id"} element={<MasterProfile />}></Route> {/* ничего */}
            <Route path={"/profile"} element={<Profile />} /> {/* профиль хороший */}
            <Route path={"/planner"} element={<PlannerApp />} /> {/* календарь занятости */}
            {/* клиентская сторона */}
            <Route path={"/page"} element={<Page />}></Route> {/* маркетплейс */}
            <Route path={"/home"} element={<ClientHome />}></Route>
            <Route index element={<ClientHome />} />
            <Route path={"/client/appointments"} element={<ClientAppointments />}></Route> {/* записи плитки */}
            <Route path={"/booking"} element={<BookingTable />}></Route> {/* бронирование календарем кастом */}
            <Route path={"/salon/:id"} element={<SalonPage />}></Route>
            <Route path={"/master/:id"} element={<MasterPage />}></Route>
            
            
            
            <Route path={"/service/:id"} element={<ServicePage />}></Route> {/* карточка услуги крупно */}
            {/* <Route path={"/master"} element={<MasterProfile />}></Route>  карточка мастера, разделы*/}
            {/* тесты */}
            <Route path={"/sample"} element={<SampleFetching />} />
            <Route path={"/schedule"} element={<SchedulePlanner />} />
            
            <Route path={"/sandbox"} element={<Experimental />}></Route>
            <Route path={"/settings"} element={<Settings />}></Route>
            <Route path={"/bento"} element={<BentoboxMenu />}></Route>
            
            {/*test directories*/}
            <Route path={"/weather"} element={<WeatherApp />}></Route>
            <Route path={"/form"} element={<Form />} />
          </Routes>
          <SampleSalon/>
        </ConfigProvider>
      </Suspense>
    </div>
  );
}

export default App;

// git add .
// git commit -m "commit name"
// git push
