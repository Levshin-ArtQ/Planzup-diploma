import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import authHeader from "../services/auth-header";
import { useNavigate } from "react-router-dom";
const useApi = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const fetchData = async (endpoint, options = {}) => {
    setLoading(true);
    try {
      const userId = JSON.parse(localStorage.getItem("user")).UID;
      console.log("userId: " + userId);
      const response = await axios({
        ...options,
        url: endpoint,
        headers: {
          // передача JWT-токена
          ...authHeader(),
          "Content-Type": "application/json",
        },
        params: {
          ...options.params,
        },
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      setData(null);
      if (err.response?.status === 401 && !error) {
        messageApi.open({
          type: "error",
          content: "Сессия истекла. Войдите заново.",
          duration: 4,
          onClose: () => {
            navigate("/login");
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
          content: "404 - некоректное обращение к серверу",
          duration: 10,
        });
      }
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData, contextHolder };
};

export default useApi;
