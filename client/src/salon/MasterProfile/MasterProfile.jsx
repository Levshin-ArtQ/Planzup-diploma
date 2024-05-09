import React, { useState, useEffect } from "react";
import { Tabs } from 'antd'; 
import WebApp from '@twa-dev/sdk';
import './MasterProfile.css';
  
const { TabPane } = Tabs;

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}
function getWeekDay(date) {
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  
    return days[date.getDay()];
  }

function getTodaysReservations(reservations) {
  const todayString = getDate(); // Assuming getDate() returns date in 'month/date/year' format
  // update indexdb storage with todays reservations

  return reservations
    .filter((reservation) => {
      const reservationDate = new Date(
        reservation.targetDateTime
      ).toLocaleDateString();
      return reservationDate === todayString;
    })
    .sort((a, b) => new Date(a.targetDateTime) - new Date(b.targetDateTime));
  // update indexdb storage with todays reservations
}

const MasterProfile = (props) => {
  const [currentDate, setCurrentDate] = useState(getDate());
  // const [currentClintsCount, setcurrentClintsCount] = useState
  const clientsCount = 7;
  // effect that updates indexdb and cloudStorage with todays reservations, retreiving them from the database every 5 minutes

  useEffect(() => {
    const interval = setInterval(async () => {
      const reservations = await fetch("/reservations").then((response) =>
        response.json()
      );
      const todaysReservations = getTodaysReservations(reservations);
      // update indexdb storage with todays reservations
      // update cloudStorage with todays reservations
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(getDate());
    }, 300000);

    return () => clearInterval(interval);
  }, []);
  const masterPhoto = props.masterPhoto; //TODO: also from database useEffect
  const masterName = props.masterName;

  return (
    <div className="profile_wrapper">
      <div className="master_photo">
        <img src={WebApp?.initDataUnsafe?.user?.photo_url} alt="master_photo" />
      </div>

      <div className="master_name">{masterName}</div>

      {/* TODO: antd navigation with 2 buttons and plus button */}
      <Tabs>
        <TabPane tab="Сегодня" key="1">
          <div className="date-time">
            <h2>{getWeekDay(new Date())}</h2>
          </div>
        </TabPane>
        <TabPane tab="Календарь" key="2">
          2nd TAB PANE Content
        </TabPane>
        <TabPane tab="Настройки" key="3">
          3rd TAB PANE Content
        </TabPane>
      </Tabs>
    </div>
  );
};

MasterProfile.propTypes = {};

export default MasterProfile;
