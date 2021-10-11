import instance from "./errorHandlers";

async function getSearchResult(page, inputUrl) {
  const res = await instance.get(page, {
    params: { inputUrl },
  });

  if (res) {
    const { totalNum, filteredData } = res;

    return { totalNum, filteredData };
  }
}

export default getSearchResult;