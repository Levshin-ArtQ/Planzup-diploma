import React, { useCallback, useEffect, useState } from 'react';
// import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import {useTelegram} from "../hooks/useTelegram";
import Button from '../components/Button/Button.jsx'; 
import './ClientHome.css'
import ServiceWidget from '../components/ServiceWidget/ServiceWidget.jsx'
import CooperationWidget from '../components/CooperationWidget/CooperationWidget.jsx'
import { YMaps, Map, GeolocationControl, TrafficControl, Circle } from '@pbe/react-yandex-maps';
import { FaMapMarkerAlt } from "react-icons/fa";
import Pie from '../components/Pie.jsx'
import ProgressBar from '../components/ProgressBar/ProgressBar.jsx';
import axios from 'axios';
import WebApp from '@twa-dev/sdk';

// import YandMaps from '../components/YandMaps/YandMaps.jsx';

// <YMaps>
//                 <div>
//                 My awesome application with maps!
//                 <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
//                 </div>
//             </YMaps>
//TODO: to database
// const services = axios.get('/')
const products = [
    {id: '1', title: 'Маникюр и педикюр в 4 руки', duration: 50, cost: 1500, closest: 'через 5 часов'},
    {id: '2', title: 'Стрижка женская', duration: 50, cost: 1200, closest: 'Завтра утром'},
    {id: '3', title: 'Педикюр', duration: 60, cost: 500, closest: 'Завтра вечером'},
    {id: '4', title: 'Брови', duration: 60, cost: '700-1220', closest: 'через час'},
]
const group = {id: '4', count1: 4, count2: 3, master_type: 'Визажист', master_name: 'Ирина', address: 'Ленина 85А', time: '20:00'};
const count = 3;
const ClientHome = () => {
    // const { user } = useTelegram();

    const { user } = WebApp.initDataUnsafe;
    const [produts, setServices] = useState([])
    const getAllServices = useCallback(async () => {
        // we will use nginx to redirect it to the proper URL
        console.log('requesting services')
        let data = []
        try {
            data = await axios.get("/api/values/all").catch();
        } catch(e) {
            console.log(e)
        }
        console.log(data);
        setServices(data);
        // setServices(data.data.rows?.map(row => row.number));
        // setServices(data);
    }, []);
    
    useEffect(() => {
        getAllServices();
        console.log('products:' +  products)
    }, []);
    return (
        <div className='wrapper'>

            <div className="hat dfc client_hat">
                <span className="greeting heading">Добрый вечер{user ? ', ' + user?.first_name : ''}</span>
                <div className="count_line dfс">
                    <span className="subheading count_text">Предстоящих записей: {count}</span>
                    <div className="peek">
                        <Link className="subheading nav-link peek-link">Посмотреть</Link>
                    </div>
                </div>
            </div>
            <div className="progress_container df">
                <ProgressBar size={100} progress={50} indicatorColor='#4f5892' label='Красота' labelColor='#4f5892' />
                <ProgressBar size={100} progress={70} indicatorColor='#8bbd2d' label='Зоровье' labelColor='#8bbd2d' />
                <ProgressBar size={100} progress={30} indicatorColor='#da565a' label='Менталочка' labelColor='#da565a' />
            </div>
            <div className="filter_block dfc">
                <span className="subheading">Какая услуга вам нужна?</span>
                <div className="button_str df">
                    <Button className="filter_button" onClick={getAllServices}>Маникюр</Button>
                    <Button className="filter_button">Педикюр</Button>
                    <Button className="filter_button">Стрижка</Button>
                </div>
                <div>{console.log(toString(produts))}</div>
            </div>

            <div className="widgets_list dfc">
                {products?.map(widget => (
                    <ServiceWidget

                        object = {widget}
                        className = {"widget"}
                    />
                ))}
            </div>

            <CooperationWidget group_booking={group} className='group'/>

            <YMaps>
                <div className='dfc'>
                    <span className="subheading sub_map"><FaMapMarkerAlt/> Здесь скоро найдутся мастера поблизости:</span>
                    <div className="map_wrapper">
                        <Map defaultState={{ center: [55.160372, 61.370303], zoom: 15 }} >
                            <GeolocationControl options={{ float: "left" }} />
                            <TrafficControl options={{ float: "right" }} />
                            <Circle
                                geometry={[[55.160372, 61.370303], 300]}
                                options={{
                                    draggable: true,
                                    fillColor: "#DB709377",
                                    strokeColor: "#990066",
                                    strokeOpacity: 0.8,
                                    strokeWidth: 5,
                                }}
                            />
                        </Map>
                    </div>
                </div>
            </YMaps>
            <Link to='/master'>Стать мастером</Link>
            
        </div>
    );
};

ClientHome.propTypes = {};

export default ClientHome;