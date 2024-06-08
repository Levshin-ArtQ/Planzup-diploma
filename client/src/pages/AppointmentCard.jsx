import React from "react";
import { Button } from "antd";
import {
  parseDate,
  parseMinutes,
  parseTime,
  parseTimezone,
} from "../utils/dateUtils";
import {
  CloseOutlined,
  FullscreenOutlined,
  UndoOutlined,
} from "@ant-design/icons";

const AppointmentCard = ({ appointment, onClick, showOptions = true }) => {

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
      <span style={{ fontWeight: "bold" }}>{appointment?.status}</span>
      <span>{parseDate(appointment?.start)}</span>
      {appointment?.cost && <span>{appointment?.cost} руб</span>}
      <span>{appointment?.master}</span>
      <div className="period">

        <span>{parseTime(appointment?.start)}</span>-
        <span>{parseTime(appointment?.end)}</span>
        <span>{parseTimezone(appointment?.end)}</span>
        <span>{parseMinutes(appointment?.durationMinutes)}</span>
        
      </div>

      {showOptions && (
        <div className="options_string" style={{ display: "flex" }}>
          <Button type="text" icon={<UndoOutlined />}>
            Перенести
          </Button>
          <Button type="primary" icon={<FullscreenOutlined />}>
            Подробнее
          </Button>
          <Button type="text" onClick={() => onClick(appointment)} icon={<CloseOutlined />} danger>
            Отменить
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;

