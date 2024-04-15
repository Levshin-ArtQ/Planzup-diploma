// import React from 'react'
// // import './Map.css'
// // import { Map, YMaps } from 'react-yandex-maps'
// import { YMaps, Map } from '@pbe/react-yandex-maps';


// const YandMaps = ({object}) => {
//   const onLoadMap = (inst) => {
//     var location = window.ymaps.geolocation.get(
//       { mapStateAutoApply: true },
//     )
//     console.log('ymaps  ', window.ymaps)
// // Асинхронная обработка ответа.
//     location.then(
//       function(result) {
//         // Добавление местоположения на карту.
//         console.log('location ', result)
//         result.geoObjects.options.set('preset', 'islands#redCircleIcon');
//         result.geoObjects.get(0).properties.set({
//           balloonContentBody: 'Мое местоположение'
//         });
//         inst.geoObjects.add(result.geoObjects);      },
//       function(err) {
//         console.log('Ошибка: ' + err)
//       },
//     )
//   }
//   const [zoom, setZoom] = React.useState(15)
//   // const setZoom = zoom=>zoom
//   const [center, setCenter] = React.useState(
//     [66.08, 76.6931577],
//   )
//   const mapState = React.useMemo(() => ({ center, zoom }),
//     [center, zoom,
//     ])
//   return (
//     <YMaps query={{
//       apikey: 'my_api',
//     }}>
//       <div>
//         <Map 
//              modules={["geolocation", "geocode"]}  
//              onLoad={(inst) => onLoadMap(inst)}
//              className='map-container'
//              state={mapState}
//         >
//         </Map>
//       </div>
//     </YMaps>
//   )
// };
// export default YandMaps;