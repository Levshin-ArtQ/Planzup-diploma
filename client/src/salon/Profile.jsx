import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Statistic } from "antd";
import CountUp from "react-countup";
import { Space, Table, Tag } from "antd";
// import { Sparkline } from "@mantine/charts";
import "./Salon.css";

// todo count statistic distribution of different services
const services = [
  {
    name: "Услуга",
    count: 10,
  },
  {
    name: "Услуга",
    count: 10,
  },
  {
    name: "Услуга",
    count: 10,
  },
];
// import { useAuth } from "../context/AuthContext";
const formatter = (value) => <CountUp end={value} separator="." />;
const columns = [
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Время",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Тип услуги",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Тэги",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Связаться с {record.name}</a>
        <a>Напомнить</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "Есения Макшина",
    date: "27.01.2024",
    time: "10:00",
    type: "Чистка лица",
    tags: ["VIP", "Постоянный"],
  },
  {
    key: "2",
    name: "София Иванова",
    date: "27.01.2024",
    time: "11:00",
    type: "Лазер",
    tags: ["Постоянный"],
  },
  {
    key: "3",
    name: "Увгения Сидорова",
    date: "27.01.2024",
    time: "12:00",
    type: "Анализ кожи",
    tags: ["Новый", "1"],
  },
  {
    key: "4",
    name: "Есения Макшина",
    date: "27.01.2024",
    time: "13:00",
    type: "Чистка лица",
    tags: ["VIP", "Постоянный"],
  },
  {
    key: "5",
    name: "София Иванова",
    date: "27.01.2024",
    time: "14:00",
    type: "Лазер",
    tags: ["Постоянный"],
  },
];

const Profile = () => {
  // check authentication effect
  // let { currentUser } = useAuth();
  let currentUser = {
    name: "Ксения",
    role: "Администратор",
    clients: 15,
    balance: 112893,
    earning: 40000,
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      // navigate to login with parameter back to profile
      navigate("/login?previous=profile");
      // navigate('/login');
    }
  }, [currentUser, navigate]);

  return (
    <div className="wrapper">
      <div className="profile">
        <Row gutter={[12, 25]}>
          <Col span={20} offset={1}>
            <h1 style={{ marginBottom: "20px" }}>
              Добро пожаловать в профиль
              {currentUser.name ? ", " + currentUser.name : ""}
            </h1>
            <h3>Ваша роль: {currentUser?.role}</h3>
          </Col>
          <Col span={24} offset={0} style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Статистика</h2>
          </Col>
          <Col span={5} offset={1}>
            <Statistic
              style={{ color: "green" }}
              title="Клиентов за месяц"
              value={currentUser.clients}
              formatter={formatter}
            />
          </Col>
          <Col span={5} offset={1}>
            <Statistic
              title="Клиентов за все время"
              value={currentUser.clients}
              formatter={formatter}
              colorBgContainer="blue"
            />
          </Col>
          <Col span={5} offset={1}>
            <Statistic
              title="Баланс аккаунта"
              value={currentUser.balance}
              precision={2}
              formatter={formatter}
              colorBgContainer="blue"
            />
          </Col>
          <Col span={5} offset={1}>
            <Statistic
              title="Выручка за месяц"
              value={currentUser.earning}
              precision={2}
              formatter={formatter}
              type="primary"
            />
          </Col>

          <Col span={24} offset={0} style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Записи</h2>
          </Col>

          <Col span={22} offset={1}>
            <Table type="primary" columns={columns} dataSource={data} scroll={{ x: 500 }} />
          </Col>
          
        </Row>
      </div>
    </div>
  );
};

export default Profile;
