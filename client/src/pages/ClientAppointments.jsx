import React, { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import AppointmentCard from "./AppointmentCard";
import { List, Avatar, Button, Space, Calendar } from "antd";

const ClientAppointments = () => {
  // fetch client appointments using useApi()
  const { data, error, loading, fetchData, contextHolder } = useApi();
  const sampleData = [
    {
      id: "1",
      type: "hair",
      title: "Укладка волос",
      duration: 30,
      cost: 800,
      master: "Юлия",
      date: "24 июня",
      when: "сегодня вечером",
      service_type: "hair",
    },
    {
      id: "2",
      type: "care",
      title: "Спа-процедуры",
      duration: 90,
      cost: 2500,
      master: "Юлия",
      date: "12 июля",
      when: "через 2 дня",
      service_type: "spa",
    },
    {
      id: "3",
      type: "care",
      title: "Массаж лица",
      duration: 40,
      cost: 900,
      master: "Юлия",
      date: "12 июля",
      when: "через 3 дня",
      service_type: "facial-massage",
    },
  ];

  useEffect(() => {
    fetchData("/client/appointments");
  }, []);

  return (
    <div>
      {contextHolder}
      {loading ? <div>loading</div> : "загружено"}
      <Calendar fullscreen={false} />
      <div className="clientAppointments" style={{ display: "flex", flexWrap: "wrap" }}>
        {sampleData.map((item) => (
          <AppointmentCard appointment={item} />
        ))}
      </div>
    </div>
  );
};

export default ClientAppointments;
