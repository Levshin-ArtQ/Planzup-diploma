
// import React, { useState } from 'react';
// // import { setupWorker } from 'msw/lib/browser';
// import { setupWorker } from 'msw/lib/browser';
// // import { rest } from 'msw/node';
// // import { http } from 'msw';
// let worker = setupWorker();

// try {
//     worker = setupWorker();
// } catch (error) {
//     console.log(error)
// }


// const Settings = () => {
//   const [settings, setSettings] = useState({
//     name: 'Default User',
//     email: 'default@example.com',
//     // Добавьте другие настройки по умолчанию, если необходимо
//   });

//   const saveSettings = () => {
//     try {
//         worker.start();
//         fetch('/settings.json', {
//         method: 'POST',
//         body: JSON.stringify(settings),
//         });
//     } catch (error) {
//         console.log(error)
//     }
    
//   };

//   const getSettings = () => {
//     worker.start();
//     fetch('/settings.json').then(response => response.json()).then(data => {
//       setSettings(data);
//     });
//   };

//   const handleChange = (event) => {
//     setSettings({
//       ...settings,
//       [event.target.name]: event.target.value,
//     });
//   };

//   return (
//     <div>
//       <input type="text" name="name" value={settings.name} onChange={handleChange} />
//       <input type="text" name="email" value={settings.email} onChange={handleChange} />
//       <button onClick={saveSettings}>Save</button>
//       <button onClick={getSettings}>Get</button>
//     </div>
//   );
// };

// export default Settings;
// // import React, { useState } from 'react';
// // // import { message } from 'service-worker-mock';

// // const Settings = () => {
// //     const [settings, setSettings] = useState({
// //         name: 'Default User',
// //         email: 'default@example.com',
// //         // Добавьте другие настройки по умолчанию, если необходимо
// //     });

// //   const saveSettings = () => {
// //     // message.postMessage({
// //     //   action: 'saveSettings',
// //     //   url: '/settings.json',
// //     //   settings: settings,
// //     // });
// //   };

// //   const getSettings = () => {
// //     // message.postMessage({
// //     //   action: 'getSettings',
// //     //   url: '/settings.json',
// //     // });
// //   };

// //   const handleChange = (event) => {
// //     // setSettings({
// //     //   ...settings,
// //     //   [event.target.name]: event.target.value,
// //     // });
// //   };

// //   return (
// //     <div>
// //       <input type="text" name="name" value={settings.name} onChange={handleChange} />
// //       <input type="text" name="email" value={settings.email} onChange={handleChange} />
// //       <button onClick={saveSettings}>Save</button>
// //       <button onClick={getSettings}>Get</button>
// //     </div>
// //   );
  
// // };

// // export default Settings;
