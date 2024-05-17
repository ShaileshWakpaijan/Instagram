import axios from "../utils/axios";

const useFollow = async (username, checkIsFollowing, setCheckIsFollowing) => {
  try {
    if (!checkIsFollowing) {
      await axios.get(`/follow/${username}/follow`);
      setCheckIsFollowing(true);
      return "Followed Successfully.";
    } else {
      await axios.get(`/follow/${username}/unfollow`);
      setCheckIsFollowing(false);
      return "Unfollowed Successfully.";
    }
  } catch (error) {
    console.log(error);
    return "Some error occured.";
  }
};

export default useFollow;
