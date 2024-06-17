import React, { useCallback, useEffect, useState } from "react";
// import Popup from 'reactjs-popup';
import { Link } from "react-router-dom";
import Button from "../components/Button/Button.jsx";
import "./ClientHome.css";
import ServiceWidget from "../components/ServiceWidget/ServiceWidget.jsx";
import CooperationWidget from "../components/CooperationWidget/CooperationWidget.jsx";
import {
  YMaps,
  Map,
  GeolocationControl,
  TrafficControl,
  Circle,
} from "@pbe/react-yandex-maps";
import { FaMapMarkerAlt } from "react-icons/fa";
import ProgressBar from "../components/ProgressBar/ProgressBar.jsx";
import axios from "axios";
import WebApp from "@twa-dev/sdk";
import useApi from "../hooks/useApi.jsx";
import useFromAPI from "../hooks/fromAPI.jsx";
import { greetUserByTime } from "../utils/dateUtils.js";

// import YandMaps from '../components/YandMaps/YandMaps.jsx';

// <YMaps>
//                 <div>
//                 My awesome application with maps!
//                 <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
//                 </div>
//             </YMaps>
//TODO: to database
// const services = axios.get('/')
const products = [
  {
    id: "1",
    type: "nails",
    title: "Маникюр и педикюр в 4 руки",
    duration: 50,
    cost: 1500,
    closest: "через 5 часов",
    service_type: "nails",
  },
  {
    id: "2",
    type: "hair",
    title: "Стрижка женская",
    duration: 50,
    cost: 1200,
    closest: "Завтра утром",
    service_type: "hair",
  },
  {
    id: "3",
    type: "nails",
    title: "Педикюр",
    duration: 60,
    cost: 500,
    closest: "Завтра вечером",
    service_type: "nails",
  },
  {
    id: "4",
    type: "makeup",
    title: "Брови",
    duration: 60,
    cost: "700-1220",
    closest: "через час",
    service_type: "eyebrows",
  },
  {
    id: "5",
    type: "makeup",
    title: "Макияж",
    duration: 45,
    cost: 1000,
    closest: "послезавтра",
    service_type: "makeup",
  },
  {
    id: "6",
    type: "hair",
    title: "Укладка волос",
    duration: 30,
    cost: 800,
    closest: "сегодня вечером",
    service_type: "hair",
  },
  {
    id: "7",
    type: "care",
    title: "Спа-процедуры",
    duration: 90,
    cost: 2500,
    closest: "через 2 дня",
    service_type: "spa",
  },
  {
    id: "8",
    type: "care",
    title: "Массаж лица",
    duration: 40,
    cost: 900,
    closest: "через 3 дня",
    service_type: "facial-massage",
  },
  {
    id: "9",
    type: "hair",
    title: "Окрашивание волос",
    duration: 120,
    cost: 2000,
    closest: "на следующей неделе",
    service_type: "hair-coloring",
  },
];
const group = {
  id: "4",
  count1: 4,
  count2: 3,
  master_type: "Визажист",
  master_name: "Ирина",
  address: "Ленина 85А",
  time: "20:00",
};
const count = 3;
const ClientHome = () => {
  // const { user } = useTelegram();
  // const { user } = WebApp.initDataUnsafe;
  const [user, setUser] = useState({});
  const [produts, setServices] = useState([]);
  const [filters, setFilters] = useState('all');
  const { data, error, loading, fetchData, contextHolder } = useFromAPI();

  useEffect(() => {
    localStorage.getItem("user") && setUser(JSON.parse(localStorage.getItem("user")));
    fetchData("/api/client/appointments/count");
    fetchData("/api");
  }, []);

  const getAllServices = useCallback(async () => {
    // we will use nginx to redirect it to the proper URL
    console.log("requesting services");
    let data = [];
    try {
      data = await axios.get("/api/values/all").catch();
    } catch (e) {
      console.log(e);
    }
    console.log(data);
    setServices(data);
    // setServices(data.data.rows?.map(row => row.number));
    // setServices(data);
  }, []);
  return (
    <div className="wrapper">
      {contextHolder}
      <div className="hat dfc client_hat">
        <span className="greeting heading">
          {greetUserByTime()}{ user ? ", " + user?.username : ""}
        </span>
        <div className="count_line dfс">
          <span className="subheading count_text">
            Предстоящих записей: {data?.data}
          </span>
          <div className="peek">
            <Link className="subheading nav-link peek-link" to="/client/appointments">Посмотреть</Link>
          </div>
        </div>
      </div>
      <div className="progress_container">
        <span className="subheading">Прогресс ваших занятий</span>
      </div>
      <div className="progress_container df">
        <ProgressBar
          size={100}
          progress={50}
          indicatorColor="#4f5892"
          label="Красота"
          labelColor="#4f5892"
        />
        <ProgressBar
          size={100}
          progress={70}
          indicatorColor="#8bbd2d"
          label="Зоровье"
          labelColor="#8bbd2d"
        />
        <ProgressBar
          size={100}
          progress={30}
          indicatorColor="#da565a"
          label="Фитнес"
          labelColor="#da565a"
        />
      </div>
      <div className="filter_block dfc">
        <span className="subheading">Какая услуга вам нужна?</span>
        <div className="button_str df">
          <Button className="filter_button" onClick={() => setFilters("all")}>
            Все
          </Button>
          <Button className="filter_button" onClick={() => setFilters("care")}>
            Уход
          </Button>
          <Button className="filter_button" onClick={() => setFilters("nails")}>
            Ногти
          </Button>
          <Button className="filter_button" onClick={() => setFilters("hair")}>
            Волосы
          </Button>
        </div>
      </div>

      <div className="widgets_list dfc">
        {products?.filter((product) => filters === "all" || product.type === filters).map((widget) => (
          <ServiceWidget object={widget} className={"widget"} />
        ))}
      </div>

      <CooperationWidget group_booking={group} className="group" />

      <YMaps>
        <div className="dfc">
          <span className="subheading sub_map">
            <FaMapMarkerAlt /> Здесь скоро найдутся мастера поблизости:
          </span>
          <div className="map_wrapper">
            <Map defaultState={{ center: [55.160372, 61.370303], zoom: 15 }}>
              <GeolocationControl options={{ float: "left" }} />
              <TrafficControl options={{ float: "right" }} />
              <Circle
                geometry={[[55.160372, 61.370303], 300]}
                options={{
                  draggable: true,
                  fillColor: "#DB709377",
                  strokeColor: "#990066",
                  strokeOpacity: 0.8,
                  strokeWidth: 5,
                }}
              />
            </Map>
          </div>
        </div>
      </YMaps>
      <Link to="/master">Стать мастером</Link>
    </div>
  );
};

ClientHome.propTypes = {};

export default ClientHome;
