import React, { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import PropTypes from "prop-types";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Rate, Button } from "antd";

const { Meta } = Card;

const ServicePage = (serviceId, masterId, date, salonId) => {
  const [service, setService] = useState();
  const [scheduleData, setScheduleData] = useState([]);
  const [closestDate, setClosestDate] = useState(new Date('2024-09-01'));
  const [duration, setDuration] = useState();
  const { data, error, loading, fetchData, contextHolder } = useApi();
  const {
    data: schedule,
    error: scheduleError,
    loading: loadingSchedule,
    fetchData: fetchSchedule,
    contextHolder: scheduleContextHolder,
  } = useApi();

  // fetch schedule every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSchedule(
        `/api/schedule/${salonId ? salonId : null}/${
          masterId ? masterId : null
        }/${serviceId}/${date ? date : null}`
      ).then((response) => {
        // check if response and schedule arrays are identical
        if (
          JSON.stringify(response.data.schedule) !==
          JSON.stringify(scheduleData)
        ) {
          // TODO: check the object response
          setScheduleData(response.data);
          setClosestDate(response.data.schedule[0].start);
        }
      }).catch((error) => {
        console.error(error);
      });
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const month = new Date(closestDate).getMonth() - new Date().getMonth();
      const days = new Date().getDay() - new Date().getDay();
      const hours = new Date().getHours() - new Date().getHours();
      const minutes = new Date().getMinutes() - new Date().getMinutes();
      return setDuration(`${month} мес. ${days} дн. ${hours} час. ${minutes} мин.`);
    }, 60000);
    return () => clearInterval(interval);
  }, []); 

  useEffect(() => {
    // Загрузка данных
    fetchData(`/api/service/${serviceId}`);

    if (salonId || masterId || date) {
      fetchSchedule(
        `/api/schedule/${salonId ? salonId : null}/${
          masterId ? masterId : null
        }/${date ? date : null}`
      );
    }
  }, []);

  return (
    <div className="service_page">
      {contextHolder}
      {scheduleContextHolder}
      <Card
        bordered={false}
        className={"service_info"}
        loading={loading}
        style={{ width: "100%" }}
        title={data?.name}
        cover={<img alt="изображение услуги" src={data?.image} />}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta description={
          <div>
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{data?.price}</div>
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Rate disabled defaultValue={parseFloat(data?.rating)} style={{ fontSize: '14px' }} />
              <span style={{ marginLeft: '5px', fontSize: '12px' }}>({data?.rating})</span>
            </div>
            <div style={{ marginTop: '5px', fontSize: '14px' }}>До ближайшего сеанса: {duration}</div>
            <Button type="primary" style={{ marginTop: '10px', width: '100%' }}>Записаться</Button>
          </div>
        } />
      </Card>
    </div>
  );
};

ServicePage.propTypes = {};

export default ServicePage;
