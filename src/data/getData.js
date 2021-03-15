const getData = async () => {
  const response = await fetch(
    "https://www.trackcorona.live/api/countries"
  ).then((res) =>
    res.json().then((data) => ({ data: data, status: res.status })).then((res)=> { return res.data})
  );

  return response;
};
export default getData;
