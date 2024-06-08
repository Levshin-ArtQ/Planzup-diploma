import React, { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import AppointmentCard from "./AppointmentCard";
import { List, Avatar, Button, Space, Calendar, Modal } from "antd";
import PrettyJson from "../devutils/PrettyJson";

const ClientAppointments = () => {
  const [open, setOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  // fetch client appointments using useApi()
  const { data, error, loading, fetchData } = useApi();
  const {data: cancelData, loading: cancelLoading, error: cancelError, fetchData: cancelFetchData} = useApi();

  

  useEffect(() => {
    fetchData("/api/client/appointments");
  }, []);

  const onCancel = (appointment) => {
    setOpen(true);
    setAppointmentToCancel(appointment);
  };

  const handleOk = () => {
    handleCancelAppointment(appointmentToCancel)
    setOpen(false);
  };

  const handleCancel = () => {
    setAppointmentToCancel(null);
    setOpen(false);
  };

  const handleCancelAppointment = (appointment) => {
    // setAppointmentToCancel(appointment);
    cancelFetchData(`/api/client/appointments/${appointment.UID}`, {method:"delete"});
    setAppointmentToCancel(null);
  };

  return (
    <div>
      {loading ? <div>loading</div> : "загружено"}
      <Calendar fullscreen={true} />
      <div className="clientAppointments" style={{ display: "flex", flexWrap: "wrap" }}>
        {data.map((item) => (
          <AppointmentCard appointment={item} onClick={onCancel} />
        ))}
      </div>

      <Modal 
        title="Отмена записи"
        open={open}
        onOk={handleOk}
        onCancel={ handleCancel }
      >
      <AppointmentCard appointment={appointmentToCancel} showOptions={false}></AppointmentCard>
      </Modal>
      
      {loading ? <div>loading</div> : <PrettyJson data={data} />}
      {cancelLoading && <div>Отменяем запись...</div>}
      {cancelError && <div>Ошибка при отмене записи</div>}
      {cancelData && <PrettyJson data={cancelData} />}
    </div>
  );
};

export default ClientAppointments;

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
    when: "через 2 дней",
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