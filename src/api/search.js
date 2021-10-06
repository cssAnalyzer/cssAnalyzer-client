import axios from "axios";

const serverURL = process.env.LOCAL_SERVER_URI;
const axiosInstance = axios.create({ serverURL });

async function getSearchResult(page, inputUrl) {
  const res = await axiosInstance.get(page, {
    params: { inputUrl },
  });

  if (res) {
    const { data } = res;

    return data;
  }
}

export default getSearchResult;
