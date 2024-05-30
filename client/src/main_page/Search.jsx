import { Link } from "react-router-dom";
import { Button, TimePicker, Select, DatePicker, Modal, Spin } from "antd";
import { useState } from "react";
import useLocation from "../hooks/useLocation";
import { YMaps, Map, Circle, GeolocationControl } from "@pbe/react-yandex-maps";
import "./Search.css";

const Search = () => {
  const [openModal, setOpenModal] = useState(false);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [serviceValue, setServiceValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");

  const { location, error, loading, handleLocationClick } = useLocation();

  const handleLocation = () => {
    console.log(location);
    handleLocationClick();
    setOpenModal(!openModal);
  };
  const onServiceChange = (value) => {
    setServiceValue(value);
  };
  const handleOk = () => {
    setOpenModal(!openModal);
  };
  const handleCancel = () => {
    setOpenModal(!openModal);
  };

  const serviceOptioins = [
    {
      label: "Все услуги",
      value: "all",
    },
    { label: "Ногти", value: "nails", emoji: "💅" },
    { label: "Маникюр", value: "manicure", emoji: "💅" },
    { label: "Педикюр", value: "pedicure", emoji: "💅" },
    { label: "Парикмахерские услуги", value: "hair_services", emoji: "💇" },
    { label: "Стрижка мужская", value: "haircut_men", emoji: "💇🏻‍♂️" },
    { label: "Стрижка женская", value: "haircut_women", emoji: "💇‍♀️" },
    { label: "Укладка", value: "styling", emoji: "💁" },
    { label: "Окрашивание", value: "coloring", emoji: "🎨" },
    { label: "Брови и ресницы", value: "brows_lashes", emoji: "👁️" },
    { label: "Коррекция бровей", value: "brow_shaping", emoji: "👁️‍🗨️" },
    { label: "Ламинирование ресниц", value: "lash_lamination", emoji: "👁️" },
    { label: "Макияж", value: "makeup", emoji: "💄" },
    { label: "Перманентный макияж", value: "permanent_makeup", emoji: "💋" },
    { label: "Уход за кожей", value: "skincare", emoji: "💆" },
    { label: "Чистка лица", value: "facial_cleaning", emoji: "🧖" },
    { label: "Массаж", value: "massage", emoji: "💆‍♂️" },
    { label: "Ароматерапия", value: "aromatherapy", emoji: "🌸" },
    { label: "Эпиляция", value: "hair_removal", emoji: "🪒" },
    { label: "Лазерная эпиляция", value: "laser_hair_removal", emoji: "🔦" },
    { label: "Восковая эпиляция", value: "waxing", emoji: "🕯️" },
    { label: "Шугаринг", value: "sugaring", emoji: "🍯" },
    { label: "Спа процедуры", value: "spa_treatments", emoji: "🧖‍♀️" },
    { label: "Релакс процедуры", value: "relaxation_treatments", emoji: "🌿" },
    { label: "Обертывание", value: "body_wrapping", emoji: "🧴" },
    {
      label: "Антицеллюлитный массаж",
      value: "anti_cellulite_massage",
      emoji: "👐",
    },
    { label: "Пилинг", value: "peeling", emoji: "🌹" },
    { label: "Биоэпиляция", value: "bio_epilation", emoji: "🍃" },
    { label: "Голливудские локоны", value: "hollywood_curls", emoji: "🌟" },
    { label: "Карвинг", value: "carving", emoji: "🔄" },
    {
      label: "Кератиновое выпрямление",
      value: "keratin_straightening",
      emoji: "✨",
    },
    { label: "Ботокс для волос", value: "hair_botox", emoji: "💉" },
    { label: "Уход за бородой", value: "beard_care", emoji: "🧔" },
    { label: "Пирсинг", value: "piercing", emoji: "💎" },
    { label: "Татуировки", value: "tattoos", emoji: "🖋️" },
  ];
  const masterOptions = [
    { label: "Николай", value: "Nikolay" },
    { label: "Александр", value: "Alexandr" },
    { label: "Александра", value: "Alexandra" },
    { label: "Алексей", value: "Alexey" },
    { label: "Анна", value: "Anna" },
    { label: "Валентин", value: "Valentin" },
    { label: "Валерия", value: "Valeria" },
    { label: "Виктор", value: "Viktor" },
    { label: "Elena", value: "Elena" },
    { label: "Alex", value: "Alex" },
  ];

  return (
    <div className="search_bar">
      <Modal open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <p>Выберите место</p>
        <div>
          {loading ? (
            <Spin size="large" />
          ) : error ? (
            <div>{error}</div>
          ) : location ? (
            <div>
              {location?.latitude} {location?.longitude}
              <YMaps>
                <div className="dfc">
                  <span className="sub_map">
                    {" "}
                    Здесь скоро найдутся мастера поблизости:
                  </span>
                  <div className="map_wrapper">
                    <Map
                      defaultState={{
                        center: [location?.latitude, location?.longitude],
                        zoom: 15,
                      }}
                    >
                      <GeolocationControl options={{ float: "left" }} />
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
            </div>
          ) : null}
        </div>
      </Modal>
      <Select
        options={masterOptions}
        filterOption={(input, option) =>
          (option?.label.toLocaleLowerCase() ?? "").includes(
            input.toLowerCase()
          )
        }
        showSearch
        optionFilterProp="children"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        defaultValue="По мастеру"
        placeholder="По мастеру"
        variant="borderless"
      />
      <Select
        options={serviceOptioins}
        onChange={onServiceChange}
        showSearch
        defaultValue="По услуге"
        placeholder="По услуге"
        variant="borderless"
      />
      <Button type="text" onClick={handleLocation}>
        По месту
      </Button>
      <DatePicker placeholder="На удобную дату" variant="borderless" />{" "}
      {/* TODO: validate date, placeholder color */}
      <TimePicker placeholder="На удобное время" variant="borderless" />
    </div>
  );
};

export default Search;
