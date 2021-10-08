import axios from "axios";
import store from "../app/store";
import STATUS from "../constants/status";
import { setError } from "../features/errorSlice";

function handleRequestError(err) {
  return Promise.reject(err);
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

const serverURL = process.env.LOCAL_SERVER_URI;
const instance = axios.create({ serverURL });

instance.interceptors.request.use(handleRequestError);
instance.interceptors.response.use(handleResponseError);

export default instance;
