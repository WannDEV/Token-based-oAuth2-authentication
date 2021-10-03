import Cookie from "js-cookie";
import api from "../../services/api";

const logout = () => {
  try {
    Cookie.remove("accessToken");
    api({
      method: "POST",
      url: "oauth/google/logout",
    });
  } catch (err) {
    console.log(err);
  }
};

export default logout;
