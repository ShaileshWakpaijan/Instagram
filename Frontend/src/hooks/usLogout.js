import axios from "../utils/axios";

const useLogout = async () => {
  try {
    let {response} = await axios.post("/user/logout");
    console.log(response)
  } catch (error) {
    return { error: error.response.data.message };
  }
};

export default useLogout;