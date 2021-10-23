import instance from "./axiosInstance";

async function getSearchResult(page, inputurl) {
  const res = await instance.get(page, {
    params: { inputurl },
  });

  if (res) {
    const { totalNum, filteredData } = res;

    return { totalNum, filteredData };
  }
}

export default getSearchResult;
