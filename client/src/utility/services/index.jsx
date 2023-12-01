const env = import.meta.env;
import axios from "axios";
const API_BASE_URL = env["VITE_APP_API_BASE_URL"];


const ApiCall = async (endPoint, method, postData = {}) => {
  let token = localStorage.getItem("token") || undefined
  let headers = {
    "Content-Type": "application/json"
  }
  if (token !== undefined)
    headers['Authorization'] = `Bearer ${token}`

  return axios({
    url: `${API_BASE_URL}${endPoint}`,
    data: postData,
    method,
    headers
  }).catch((err) => {
    return err.response;
  });
};

export { ApiCall };
