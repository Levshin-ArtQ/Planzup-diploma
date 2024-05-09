import React, { useEffect } from "react";
import "./ClientCall.css";

const services = [
  {
    name: "Услуга",
    id: 1,
  },
  {
    name: "Услуга",
    id: 2,
  },
  {
    name: "Услуга",
    id: 3,
  },
];

const getTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.cost, 0);
};

const ClientCall = () => {
  useEffect(() => {}, []);
  return (
    <div className="client_call_wrapper">
      <section className="client_call">
        <h1>Запись клиента</h1>
        <div className="services-radio flex column">
          {services.map((service) => (
            <button className="service-radio flex" key={service.id}>
              <span className="service_name">{service.name}</span>
              <span className="service_price">{service.cost}₽</span>
            </button>
          ))}
        </div>
        <div className="total_price">
          <span>Итого: </span>
          <span>{getTotalPrice(services)}₽</span>
        </div>
      </section>
    </div>
  );
};

ClientCall.propTypes = {};

export default ClientCall;
