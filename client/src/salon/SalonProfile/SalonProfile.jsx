import React from 'react';
import { Children } from 'react';
import Button from "../../components/Button/Button";
import { Link } from 'react-router-dom';
import './SalonProfile.css';


const SalonProfile = ({ children }) => {
    return (
        <>
            <div className='salon_wallpaper'>
            </div>
            <div className='menu_options'>
                <Link className='booking_button button nav-link' to='/booking'>Записаться</Link> 
                <Button>Позвонить</Button>
                <Button>Поделиться</Button>
            </div>
            {children}

        </>

    );
};


export default SalonProfile;