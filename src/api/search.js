import axios from "axios";

const serverURL = process.env.LOCAL_SERVER_URI;
const axiosInstance = axios.create({ serverURL });

async function postSearchResult(page, inputUrl) {
  const res = await axiosInstance.post(`${page}`, inputUrl);

  if (res) {
    const { data } = res;

    return { data };
  }
}

export default postSearchResult;
