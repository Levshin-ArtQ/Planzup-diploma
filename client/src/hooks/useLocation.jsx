import { useState, useMemo } from 'react';
import WebApp from '@twa-dev/sdk';

const useLocation = () => { //TODO: move to utils folder it is not a hook
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleLocationClick() {
    if (navigator.geolocation) {
      try {
        navigator.geolocation.getCurrentPosition(success, error);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
  }

  return { location, error, loading, handleLocationClick };


  // const location = WebApp?.Location;

  // const getCurrentPosition = useCallback(
  //   (options) =>
  //     new Promise((resolve, reject) => {

  //       location?.getCurrentPosition(resolve, reject, options);
  //     }),
  //   [location],
  // );
  // const watchPosition = useCallback(
  //   (options) =>
  //     new Promise((resolve, reject) => {
  //       location?.watchPosition(resolve, reject, options);
  //     }),
  //   [location],
  // );  
  // return useMemo(() => ({ getCurrentPosition, watchPosition }), [getCurrentPosition, watchPosition]);
}
export default useLocation;