import axios from "../utils/axios";

const useSignup = async (data) => {
  try {
    let response = await axios.post("/user/register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
    
  } catch (error) {
    return { error: error.response.data.message };
  }
};

export default useSignup;
