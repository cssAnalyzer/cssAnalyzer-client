import axios from "axios";
import { store } from "../app/store";
import STATUS from "../constants/status";
import { setError } from "../features/errorSlice";

function parseResponseData(response) {
  return response.data;
}

function handleResponseError(err) {
  const error = (err.response?.status < STATUS.CODES.INTERNAL_SERVER_ERR)
    ? ({
      statusCode: err.response.status,
      message: err.response.data.error,
    })
    : ({
      statusCode: STATUS.CODES.INTERNAL_SERVER_ERR,
      message: STATUS.ERROR_MSG.INTERNAL_SERVER_ERR,
    });

  store.dispatch(setError(error));
}

const serverURL = process.env.REACT_APP_LOCAL_SERVER_URI;
const instance = axios.create({ serverURL });

instance.interceptors.response.use(parseResponseData, handleResponseError);

export default instance;
