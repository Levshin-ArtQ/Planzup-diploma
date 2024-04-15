import React, { useState } from 'react';
import axios from 'axios';
import './BookingTable.css';
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import picture from '../../img/salon0.jpg'
import Button from '../Button/Button'; 
import { FaStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";


function getWeekDay(date) {
    let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  
    // return days[date.getDay()];
    return days[date];
  }

const reserved = [
    {'rowIndex': 1, 'cellIndex': 1},
    {'rowIndex': 0, 'cellIndex': 1},
    {'rowIndex': 0, 'cellIndex': 2},
]
const seanceHours = [
    {id: 0, time: '9:00'},
    {id: 1, time: '10:30'},
    {id: 2, time: '12:00'},
    // {id: 3, time: '13:30'},
    {id: 4, time: '15:00'},
    {id: 5, time: '16:30'},
    {id: 6, time: '18:00'},
    {id: 7, time: '19:30'},
];

function getDate(i) {
    
    let today = new Date();
    console.log(today.setDate(today.getDate() + parseInt(i)));

    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const weekday = getWeekDay(today.getDay());
    console.log('date:' + date)
    console.log('weekday:' + weekday)
    return {date, weekday, month}
    // return `${month}/${date}/${year}/${weekday}`;
  }
function getWeek() {
    let week = []
    for (let i = 0; i < 4; i++) {
        week.push(getDate(i));
    }
    return week;
}

const weekData = getWeek();
const data = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    { id: 3, name: "Bob", age: 35 },
];

const BookingTable = ({ serviceName, serviceRate, serviceDuration }) => {
    console.log(reserved)
    const initPoint = {'rowIndex': 1, 'cellIndex': 2}
    const [selected, setSelected] = useState(initPoint)
    const [selectedValue, setSelectedValue] = useState('')
    const [answer, setAnswer] = useState('')
    const handleClick = (rowIndex, cellIndex) => {
        const cellData =
          seanceHours[rowIndex][Object.keys(seanceHours[rowIndex])[cellIndex]]; //TODO: another way of parsing id time
        const clickedTime = seanceHours[rowIndex].time
        
        setSelected({rowIndex, cellIndex});
        setSelectedValue(clickedTime);
        console.log(
          `Cell clicked: Row ${rowIndex}, Cell ${cellIndex}, Value: ${cellData}`
        );
        console.log(selected)
      };
    const saveReservation = () => {
      const newReservation = { 
        userId: '-0', 
        place: 'Home', 
        master: 'Elena', 
        serviceId: null, 
        serviceName: 'Haircut', 
        chosenDTime: Date.now(), 
        tgChat: 'later', 
        note: selectedValue,
      } //TODO: create the entity of reservation
      axios
        .post('api/reservation/save', newReservation)
        .then((response) => setAnswer(response.data));
    }

      return (
        <div className="container">
          <h3>Выберите дату и время сеанса</h3>
          <h4>{answer}</h4>
          <img src="" alt="" className='booking_img'/>
          <div className="info_line df">
            <div className="rating df">
                <span className="num">4.5</span>
                <FaStar className="star_icon icon"></FaStar></div>
            <div className="duration df">
                <FaRegClock className="duration_icon icon" />
                <span className="duration_value">1ч 25 мин</span></div>
            <div className="cost df">
                <FaMoneyBillWave className="cost_icon icon" />
                <span className="cost_value">XXXX Р</span>
            </div>
          </div>
          <div className="master_line df">
            <img src="" alt="" className="master_icon icon" />
            <span className="master_name"></span>
            <span className="master_status"></span>
          </div>
          <div className="location_line df">
            <img src="" alt="" className="location_icon" />
            <img src="" alt="" className="location_name" />
          </div>
          <table className="custom-table">
            <thead>
              <tr>
                {weekData.map((item) =>(
                    <th>
                        {item.date} {item.weekday}
                    </th>
                ))}
              </tr>
            </thead>
            <tbody>
                {seanceHours.map((row, rowIndex) => (
                    <tr key={row.id}>
                        {weekData.map((cell, cellIndex) => (
                            <td
                                key={cellIndex}
                                onClick={() => handleClick(rowIndex, cellIndex)}
                                className="cell"
                                tabIndex={0}
                                style={{
                                    background: selected.rowIndex === rowIndex && selected.cellIndex === cellIndex ? '#b9424b' : '',
                                    color: selected.rowIndex === rowIndex && selected.cellIndex === cellIndex ? '#fff' : '',
                                }}
                            >   
                                {row.time}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
          </table>
          <div className="booking_line">
            <span className="booking_date">{selectedValue}</span>
            <Button className="complete_button" onClick={saveReservation}>Записаться</Button>
          </div>
        </div>
      );
};

BookingTable.propTypes = {};

export default BookingTable;