import React from "react";
import { Button } from "antd";
import { CloseOutlined, FullscreenOutlined, UndoOutlined } from "@ant-design/icons";
const AppointmentCard = ({ appointment }) => {
  return (
    <div
      className="appointmentCard"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        margin: "10px",
        backgroundColor: "#fff",
        borderRadius: "12px",
      }}
    >
      <span style={{ fontWeight: "bold" }}>{appointment.title}</span>
      <span>{appointment.duration} min</span>
      <span>{appointment.cost} руб</span>
      <span>{appointment.master}</span>
      <span>{appointment.date}</span>
      <span>{appointment.when}</span>
      <div className="options_string" style={{ display: "flex" }}>
        <Button type="text" icon={<UndoOutlined />}>Перенести</Button>
        <Button type="primary"  icon={<FullscreenOutlined />}>Подробнее</Button>
        <Button type="text" icon={<CloseOutlined />} danger>Отменить</Button>
      </div>
    </div>
  );
};

export default AppointmentCard;
