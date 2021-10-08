import instance from "./error";

async function getSearchResult(page, inputUrl) {
  const res = await instance.get(page, {
    params: { inputUrl },
  });

  if (res) {
    const { data } = res;

    return data;
  }
}

export default getSearchResult;
