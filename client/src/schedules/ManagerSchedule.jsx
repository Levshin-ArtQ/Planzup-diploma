import React, { useState, useEffect } from "react";
import { Space } from "antd";
import {
  Badge,
  Calendar,
  message,
  // Notification,
  DatePicker,
  Radio,
  Avatar,
  Select,
} from "antd";
import "./schedule.css";
import useApi from "../hooks/useApi";

// sample data
const getServices = (data) => {
  let listData = [];
  if (!data) return [{ name: "Все услуги", id: "all" }];
  for (let i = 0; i < data.length; i++) {
    listData.push({ name: data[i].name, id: data[i].id });
  }
  return listData;
};

const getMasters = (data) => {
  let listData = [];
  if (!data)
    return [
      { name: "Все мастера", id: "all" },
      { name: "Ольга", id: "salon_olga", image: "../img/salon0.jpg" },
      { name: "Марина", id: "salon_marina" },
      { name: "Ксения М.", id: "salon_ksenya" },
    ];
  for (let i = 0; i < data.length; i++) {
    listData.push({ name: data[i].name, id: data[i].id });
  }
  return listData;
};
const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: "warning",
          content: `Мало мастеров `,

        },
        {
          type: "error",
          content: `${value.slotsCount ? value.slotsCount + " свободных мест" : "нет мест"}`,
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
        {
          type: "error",
          content: "This is error event.",
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: "warning",
          content: "This is warning event",
        },
        {
          type: "success",
          content: "This is very long usual event......",
        },
        {
          type: "error",
          content: "This is error event 1.",
        },
        {
          type: "error",
          content: "This is error event 2.",
        },
        {
          type: "error",
          content: "This is error event 3.",
        },
        {
          type: "error",
          content: "This is error event 4.",
        },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

// data fetching function
const ManagerSchedule = () => {
  const { data, error, loading, fetchData, contextHolder } = useApi();
  const {
    data: dataFilter,
    error: errorFilter,
    loading: loadingFilter,
    fetchData: fetchDataFilter,
  } = useApi();
  const [slots, setSlots] = useState([]);
  const [filter, setFilter] = useState({});
  const [filterType, setFilterType] = useState("day");
  useEffect(() => {
    fetchData(`/api/schedule`);
    
  });

  

  // handlers
  const handleChange = (value) => {
    setFilter({ ...filter, master: value });
  };

  const onPanelChange = (value, mode) => {
    setFilterType(mode);
  };

  const onOk = (value) => {
    setFilter({ ...filter, date: value });
  };  

  const onOkService = (value) => {
    setFilter({ ...filter, service: value });
  };

  // rendering functions
  const Filter = (type, value) => {
    // fetchDataFilter(`/api/schedule/filter/${filterType}`);
    if (type === "day") {
      return <DatePicker onChange={(e) => setFilter({ ...filter, date: e })} />;
    } else if (filter.type === "master") {
      return (
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Выберите мастера"
          defaultValue={["all"]}
          onChange={handleChange}
          options={getMasters([])} // TODO: getMasters(data)
          optionRender={(option) => (
            <Space>
              <span role="img" aria-label={option.data.label}>
                {option.data.emoji}
              </span>
              {option.data.desc}
            </Space>
          )}
        />
      );
    } else if (filter.type === "service") {
      return (
        <DatePicker onChange={(e) => setFilter({ ...filter, service: e })} />
      );
    }
  };

  const displayData = () => {
    if (data) {
      console.log(data);
    }
  };
  useEffect(() => {
    displayData();
  }, [data]);
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    // fetch data from API in form of butch and compare dates with current
    // TODO: get data for date or month from API and pass it to cellRender
    // console.log(current, info);

    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  // main rendering
  return (
    <div>
      {contextHolder}
      <h1>быстрая запись</h1>
      <h2>Как подбираем?</h2>
      <Radio.Group
        defaultValue="date"
        buttonStyle="solid"
        onChange={(e) => setFilterType({ ...filter, type: e.target.value })}
      >
        <Radio.Button value="date">По времени</Radio.Button>
        <Radio.Button value="master">По мастеру</Radio.Button>
        <Radio.Button value="service">По услуге</Radio.Button>
      </Radio.Group>
      <div>{Filter(filterType, filter)}</div>

      <Calendar cellRender={cellRender} />
    </div>
  );
};
export default ManagerSchedule;
