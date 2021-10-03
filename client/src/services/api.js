import axios from "axios";
import Cookie from "js-cookie";
import logout from "../shared/helper/logout-method";

async function refreshToken() {
  await api({
    method: "PUT",
    url: "oauth/google/refreshtoken",
  }).then((response) => {
    Cookie.set("accessToken", response.data.accessToken);
  });
}

let urls = {
  test: `http://localhost:2000/`,
  development: "http://localhost:2000/",
  production: "https://wanntech.dk/",
};
const api = axios.create({
  baseURL: urls[process.env.NODE_ENV],
  withCredentials: true,
});

api.interceptors.response.use(
  function (response) {
    const { status, data, config } = response;
    console.log(`Response from ${config.url}:`, {
      code: status,
      ...data,
    });
    return response;
  },
  async function (error) {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          if (data.message === "Access token expired") {
            try {
              await refreshToken();
              const config = error.config;

              return await api({
                method: config.method,
                url: config.url,
                data: config.data,
                withCredentials: true,
              });
            } catch (err) {
              return (window.location.href = "/error-page");
            }
          } else if (
            data.message === "Refresh token expired" ||
            data.message === "Access and refresh token expired"
          ) {
            logout();
            return (window.location.href = "/logged-out");
          } else {
            return (window.location.href = "/error-page");
          }
        default:
          return Promise.reject(error);
      }
    } else if (error.request) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
