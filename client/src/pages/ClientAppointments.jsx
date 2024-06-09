import React, { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import AppointmentCard from "./AppointmentCard";
import { Calendar, Modal, Spin, Alert, Button } from "antd";
import PrettyJson from "../devutils/PrettyJson";
import moment from "moment";
import './ClientAppointments.css';

const ClientAppointments = () => {
  const [open, setOpen] = useState(false);
  const [appointmentToView, setAppointmentToView] = useState(null);
  const [openCancel, setOpenCancel] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const { data, error, loading, fetchData } = useApi();
  const { data: cancelData, loading: cancelLoading, error: cancelError, fetchData: cancelFetchData } = useApi();

  useEffect(() => {
    fetchData("/api/client/appointments");
  }, []);

  const onView = (appointment) => {
    setOpen(true);
    setAppointmentToView(appointment);
  };

  const onCancel = (appointment) => {
    setOpenCancel(true);
    setAppointmentToCancel(appointment);
  };

  const handleClose = () => {
    setOpen(false);
    setAppointmentToView(null);
  };

  const handleCancel = () => {
    setOpenCancel(false);
    setAppointmentToCancel(null);
  };

  const handleCancelAppointment = () => {
    if (appointmentToCancel) {
      cancelFetchData(`/api/client/appointments/${appointmentToCancel.UID}`, { method: "delete" });
      handleCancel();
    }
  };

  const dateCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const appointmentsForDay = data.filter(appointment => moment(appointment.start).format("YYYY-MM-DD") === dateStr);

    return (
      <div className="calendar-cell">
        {appointmentsForDay.map(appointment => (
          <div key={appointment.UID} className="calendar-appointment" onClick={() => onView(appointment)}>
            <div className="appointment-time">{moment(appointment.start).format('HH:mm')} - {moment(appointment.end).format('HH:mm')}</div>
            <div className="appointment-master">{appointment.master}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="client-appointments">
      {loading ? <Spin tip="Loading..."/> : <Calendar fullscreen={true} className="appointments-calendar" dateCellRender={dateCellRender} />}
      <div className="appointments-list">
        {data.map((item) => (
          <div key={item.UID} onClick={() => onView(item)}>
            <AppointmentCard appointment={item} onClick={onView} onClickCancel={onCancel} />
          </div>
        ))}
      </div>

      <Modal
        title="Информация о записи"
        visible={open}
        footer={[
          <Button key="close" onClick={handleClose}>
            Закрыть
          </Button>,
        ]}
        onCancel={handleClose}
      >
        <AppointmentCard appointment={appointmentToView} showOptions={false} />
      </Modal>

      <Modal
        title="Отмена записи"
        visible={openCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Отменить
          </Button>,
          <Button key="submit" type="primary" danger onClick={handleCancelAppointment}>
            Удалить
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        <AppointmentCard appointment={appointmentToCancel} showOptions={false} />
      </Modal>

      {loading ? <Spin tip="Loading data..."/> : <PrettyJson data={data} />}
      {cancelLoading && <Spin tip="Отменяем запись..."/>}
      {cancelError && <Alert message="Ошибка при отмене записи" type="error" />}
      {cancelData && <PrettyJson data={cancelData} />}
    </div>
  );
};

export default ClientAppointments;
