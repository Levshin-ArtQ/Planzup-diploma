import axios from "axios";

const API_URL = "/api/auth/";

class AuthService {
  async login(username, password) {
    const response = await axios
      .post(API_URL + "signin", {
        username,
        password
      });
    if (response.data.accessToken) {
      // записываем данные пользователя в локальное хранилище
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    // удаляем пользователя из локального хранилища
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
      // password: hashPassword(password)
      // TODO: добавить поля с другими данными
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;