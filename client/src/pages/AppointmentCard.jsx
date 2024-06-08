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
import './AppointmentCard.css';

const AppointmentCard = ({ appointment, onClick, showOptions = true }) => {
  return (
    <div className="appointment-card">
      <div className="appointment-card__header">
        <span className={`appointment-card__status ${appointment?.status}`}>
          {appointment?.status}
        </span>
        <span className="appointment-card__date">
          {parseDate(appointment?.start)}
        </span>
      </div>
      <div className="appointment-card__body">
        <div className="appointment-card__image">
          {/* Placeholder for image */}
        </div>
        <div className="appointment-card__details">
          <h2 className="appointment-card__master">{appointment?.master}</h2>
          {appointment?.cost && (
            <p className="appointment-card__cost">{appointment?.cost} руб</p>
          )}
          <div className="appointment-card__time">
            <span>{parseTime(appointment?.start)}</span> -{" "}
            <span>{parseTime(appointment?.end)}</span>{" "}
            <span>{parseTimezone(appointment?.end)}</span>
            <span className="appointment-card__duration">
              ({parseMinutes(appointment?.durationMinutes)})
            </span>
          </div>
        </div>
      </div>
      {showOptions && (
        <div className="appointment-card__options">
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
