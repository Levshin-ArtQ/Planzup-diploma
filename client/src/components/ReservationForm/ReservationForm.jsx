import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { AddToCalendarButton } from 'add-to-calendar-button-react';
function getSchedule(masterName) {

 console.log('yes I need schedule')
}
const ReservationForm = () => {
    const [scheldule, setSchedule] = useState(getSchedule('masterName'))
    // useEffect

    return (
        <div>
        main
         </div>

        // <AddToCalendarButton
        //     name="Title"
        //     options={['Apple','Google']}
        //     location="World Wide Web"
        //     startDate="2023-12-01"
        //     endDate="2023-12-01"
        //     startTime="10:15"
        //     endTime="23:30"
        //     timeZone="America/Los_Angeles"
        // ></AddToCalendarButton>
            
       
    );
};

ReservationForm.propTypes = {};

export default ReservationForm;
