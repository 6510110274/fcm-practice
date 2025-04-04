import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { toast, ToastContainer } from "react-toastify";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import app from "../config/firebase";

function App() {
  const messaging = getMessaging(app);
  const vapidKey = import.meta.env.VITE_VAPID_KEY;

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    toast(
      `Message received. ${payload.notification.title} ${payload?.notification?.body}`
    );
  });

  const registerNotify = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Notification permission denied");
        return;
      }
  
      const currentToken = await getToken(messaging, { vapidKey });
  
      if (!currentToken) {
        console.warn("No FCM token received");
        toast.error("Failed to retrieve FCM token");
        return;
      }
  
      console.log("Token", currentToken);
      toast.success("Token: " + currentToken);
    } catch (error) {
      console.error("Error getting FCM token:", error);
      toast.error("An error occurred while retrieving the FCM token");
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => registerNotify()}>
          Register Notify
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ToastContainer />
    </>
  )
}

export default App
