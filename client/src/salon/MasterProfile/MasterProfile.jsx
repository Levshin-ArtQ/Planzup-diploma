import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';



function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

const MasterProfile = (props) => {
    const [currentDate, setCurrentDate] = useState(getDate());
    // const [currentClintsCount, setcurrentClintsCount] = useState
    const clientsCount = 7;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(getDate());
        }, 300000);
    
        return () => clearInterval(interval);
      }, []);
    const masterPhoto = props.masterPhoto; //TODO: also from database useEffect
    const masterName = props.masterName;


    return (
        <div className='profile_wrapper'>
            <div className="navbar">
                <img src="" alt="Фото" className="profile_photo" />
                <span className="date">{currentDate}</span>
                <img src="" alt="Настройки" className="settings_icon" />
            </div>
            <div className="dashboard">
                <div className="segment1 fb"><span className='stat'>{clientsCount}</span><span className='statname'>Клиентов на этой неделе</span></div>
                <div className="segment2 fb"><span className='stat'>12:30</span><span className='statname'>Ближайшая встреча с клиентом</span></div>
            </div>
            
        </div>

    );
};

MasterProfile.propTypes = {};

export default MasterProfile;