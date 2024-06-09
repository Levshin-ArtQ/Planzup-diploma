import React, { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import AppointmentCard from "./AppointmentCard";
import { Calendar, Modal, Spin, Alert, Badge } from "antd";
import PrettyJson from "../devutils/PrettyJson";
import moment from "moment";
import './ClientAppointments.css';

const ClientAppointments = () => {
  const [open, setOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const { data, error, loading, fetchData } = useApi();
  const { data: cancelData, loading: cancelLoading, error: cancelError, fetchData: cancelFetchData } = useApi();

  useEffect(() => {
    fetchData("/api/client/appointments");
  }, []);

  const onCancel = (appointment) => {
    setOpen(true);
    setAppointmentToCancel(appointment);
  };

  const handleOk = () => {
    handleCancelAppointment(appointmentToCancel);
    setOpen(false);
  };

  const handleCancel = () => {
    setAppointmentToCancel(null);
    setOpen(false);
  };

  const handleCancelAppointment = (appointment) => {
    cancelFetchData(`/api/client/appointments/${appointment.UID}`, { method: "delete" });
    setAppointmentToCancel(null);
  };

  const dateCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const appointmentsForDay = data.filter(appointment => moment(appointment.start).format("YYYY-MM-DD") === dateStr);

    return (
      <div>
        {appointmentsForDay.length > 0 && (
          <Badge count={appointmentsForDay.length} style={{ backgroundColor: '#52c41a' }} />
        )}
      </div>
    );
  };

  return (
    <div className="client-appointments">
      {loading ? <Spin tip="Loading..."/> : <Calendar fullscreen={true} className="appointments-calendar" dateCellRender={dateCellRender} />}
      {error ? null : (
        <div className="appointments-list">
          {data.map((item) => (
            <AppointmentCard key={item.UID} appointment={item} onClick={onCancel} />
          ))}
        </div>
      )}

      <Modal
        title="Отмена записи"
        open={open}
        onOk={handleOk}
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
