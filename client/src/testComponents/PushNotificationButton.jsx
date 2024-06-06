import React, { useEffect } from "react";

const PushNotificationButton = () => {
  var curlCommandDiv = document.querySelector('.js-curl-command'); 
  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
  };
  const publicVapidKey =
    "BOSSP8ivAMvDHHMvMM_aX6kr70eDrKaiZ6ZU7QN6ftXeHC1HnGFrPvrJUgF04QExxCCNsK_Hdp83yFJNAbJSQik";

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("../service-worker.js")
        .then(async (registration) => {
          const subscription = await registration.pushManager.getSubscription();
          if (subscription) {
            return subscription;
          }
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
          });
        })
        .then((subscription) => {
          // Отправьте информацию о подписке на ваш сервер
          fetch("notifications/subscribe", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
              "Content-Type": "application/json",
            },
          });
        })
        .catch((error) =>
          console.error("Error during service worker registration:", error)
        );
    }
  }, []);

  const sendSubscriptionToServer = (subscription) => {
      console.log(subscription)
  }

  const requestPush = () => {
    console.log(navigator)
    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      console.log("service worker ready")
      // Do we already have a push message subscription?
      serviceWorkerRegistration.pushManager
        .getSubscription()
        .then((subscription) => {
          console.log('subscription successfully enabled')
          // Enable any UI which subscribes / unsubscribes from
          // push messages.
          const pushButton = document.querySelector(".js-push-button");
          pushButton.disabled = false;

          if (!subscription) {
            console.log('We arent subscribed to push, so set UI')
            // We aren't subscribed to push, so set UI
            // to allow the user to enable push
            return;
          }

          // Keep your server in sync with the latest subscriptionId
          sendSubscriptionToServer(subscription);

          // Set your UI to show they have subscribed for
          // push messages
          pushButton.textContent = "Disable Push Messages";
        })
        .catch((err) => {
          console.error(`Error during getSubscription(): ${err}`);
        });
    });
  };

  return <button onClick={requestPush}>Enable Push Notifications</button>;
};

export default PushNotificationButton;
