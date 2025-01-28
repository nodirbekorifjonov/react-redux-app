import axios from "./api";

const AuthService = {
  async userRegister(user) {
    const response = await axios.post("/users", { user });

    return response;
  },
  async userLogin() {
    // const response = await axios.post("/users/login");
  },
  async getUser() {
    // const response = await axios.post("/user");
  },
};

export default AuthService;
