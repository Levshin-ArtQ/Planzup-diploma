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
]
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
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "Есения Макшина",
    date: '27.01.2024',
    time: '10:00',
    type: "Чистка лица",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    date: '27.01.2024',
    time: '11:00',
    type: "Лазер",
    tags: ["постоянный клиент"],
  },
  {
    key: "3",
    name: "Joe Black",
    date: '27.01.2024',
    time: '12:00',
    type: "Анализ кожи",
    tags: ["новый", "teacher"],
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
      <h1>
        Добро пожаловать в профиль
        {currentUser.name ? ", " + currentUser.name : ""}
      </h1>
      <p>Ваша роль: {currentUser?.role}</p>
      <div className="stats">
        <p>Статистика</p>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              style={{ color: "green" }}
              title="Клиентов в текущем месяце"
              value={currentUser.clients}
              formatter={formatter}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Клиентов в всем месяце"
              value={currentUser.clients}
              formatter={formatter}
              colorBgContainer="blue"
            />
          </Col>
          <Col span={12}>

            <Statistic
              title="Баланс аккаунта"
              value={currentUser.balance}
              precision={2}
              formatter={formatter}
              colorBgContainer="blue"
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Выручка за месяц"
              value={currentUser.balance}
              precision={2}
              formatter={formatter}
              type="primary"
            />
          </Col>
          <Col span={12}>
            <Table type="primary" columns={columns} dataSource={data} />
          </Col>
          <Col span={12}>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Profile;
