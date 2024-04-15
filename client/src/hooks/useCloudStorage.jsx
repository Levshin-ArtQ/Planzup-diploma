import { useCallback, useMemo } from 'react';


const useCloudStorage = () => {
  const cloudStorage = window.Telegram.WebApp?.CloudStorage;

  const getItem = useCallback(
    key =>
      new Promise((resolve, reject) => {
        cloudStorage?.getItem(key, (error, value) => {
          if (!error) {
            resolve(value);
          } else {
            reject(error);
          }
        });
      }),
    [cloudStorage],
  );
  const setItem = useCallback(
    (key, value) =>
      new Promise((resolve, reject) => {
        cloudStorage?.setItem(key, value, (error, state) => {
          if (!error && state) {
            resolve();
          } else {
            reject(error);
          }
        });
      }),
    [cloudStorage],
  );
  const getItems = useCallback(
    key =>
      new Promise((resolve, reject) => {
        cloudStorage?.getItems(key, (error, value) => {
          if (!error && value) {
            resolve(value);
          } else {
            reject(error);
          }
        });
      }),
    [cloudStorage],
  );
  const removeItem = useCallback(
    key =>
      new Promise((resolve, reject) => {
        cloudStorage?.removeItem(key, (error, state) => {
          if (!error && state) {
            resolve();
          } else {
            reject(error);
          }
        });
      }),
    [cloudStorage],
  );
  const removeItems = useCallback(
    key =>
      new Promise((resolve, reject) => {
        cloudStorage?.removeItems(key, (error, state) => {
          if (!error && state) {
            resolve();
          } else {
            reject(error);
          }
        });
      }),
    [cloudStorage],
  );
  const getKeys = useCallback(
    () =>
      new Promise((resolve, reject) => {
        cloudStorage?.getKeys((error, state) => {
          if (!error && state) {
            resolve(state);
          } else {
            reject(error);
          }
        });
      }),
    [cloudStorage],
  );

  return useMemo(
    () => ({
      getItem,
      setItem,
      getItems,
      removeItem,
      removeItems,
      getKeys,
    }),
    // Осознанно в зависимостях только cloudStorage
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cloudStorage],
  );
};

export default useCloudStorage;