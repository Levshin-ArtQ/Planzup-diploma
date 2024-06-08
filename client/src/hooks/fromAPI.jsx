import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import authHeader from "../services/auth-header";
const useFromAPI = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  // limit timeout
  const timeout = 30000;

  const successHandler = (response) => {
    console.log(response.data);
    setData(response.data);
    setError(null);
  };

  const errorHandler = (err) => {
    setData(null);
      if (err.response?.status === 401 && !error) {
        messageApi.open({
          type: "error",
          content: "Сессия истекла. Войдите заново.",
          duration: 10,
          onClose: () => {
            window.location.reload();
          },
        });
      }
      if (err.response?.status === 403 && !error) {
        messageApi.open({
          type: "error",
          content: err?.message || "Доступ запрещен.",
          duration: 10,
        });
      }
      if (err.response?.status === 500 && !error) {
        messageApi.open({
          type: "error",
          content: err?.message || "Сервер не отвечает. Попробуйте позже.",
          duration: 10,
        });
      }
      if (err.response?.status === 404 && !error) {
        messageApi.open({
          type: "error",
          content: "404 - некоректное обращение к серверу", // TODO: test message and set normal status of error
          duration: 10,
        });
      }
      setError(err);
  }

  const fetchData = async (endpoint, method = null, options = {}) => {
    setLoading(true);
    try {
      const userId = JSON.parse(localStorage.getItem("user")).UID;
      console.log("userId: " + userId);
      console.log("endpoint: " + endpoint);
      console.log("method: " + method);
      let response = null;
      console.log("get request");
      
      if (method === "get" || !method) {
        console.log("get request");
        axios.get(endpoint, {
          headers: {
            ...authHeader(),
            'Content-Type': 'application/json',
          },
        }).then(successHandler).catch(errorHandler).finally(() => setLoading(false));
      } else if (method === "post") {
        axios.post(endpoint, options, {
          params: {
            userId, // Добавление userId в параметры запроса, если это необходимо
          },
          headers: {
            ...authHeader(),
            userId: userId,
          },
        }).then(successHandler).catch(errorHandler).finally(() => setLoading(false));
      } else if (method === "put") {
        axios.put(endpoint, options, {
          params: {
            userId, // Добавление userId в параметры запроса, если это необходимо
          },
          headers: {
            ...authHeader(),
          },
        }).then(successHandler).catch(errorHandler).finally(() => setLoading(false));
      } else if (method === "delete") {
        axios.delete(endpoint, {
          params: {
            userId, // Добавление userId в параметры запроса, если это необходимо
          },
          headers: {
            ...authHeader(),
          },
        }).then(successHandler).catch(errorHandler).finally(() => setLoading(false));
      }
    } catch (err) {
      console.log("err:: ", err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData, contextHolder };
};

export default useFromAPI;
