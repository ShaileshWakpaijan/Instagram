import axios from "../utils/axios";

const useLogin = async (data) => {
  try {
    let response = await axios.post("/user/login", data);
    if (response.data.data) {
      return response.data.data;
    }
  } catch (error) {
    return { error: error.response.data.message };
  }
};

export default useLogin;
