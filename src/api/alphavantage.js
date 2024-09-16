import axios from "axios";

const apiKey = "U30YOR95Q5YIFM45";
const instance = axios.create({
  baseURL: `https://www.alphavantage.co`
});

export const call = async (params, options) => {
  const urlParams = Object.entries(params)
    .map(v => `${v[0]}=${v[1]}`)
    .join("&");
  console.log("API Call", params, `${instance.defaults.baseURL}/${urlParams}`);
  const res = await instance.get(
    `query?apikey=${apiKey}&${urlParams}`,
    options
  );

  return new Promise((resolve, reject) => {
    if (res.data["Error Message"] || res.data["Note"]) {
      reject(res.data["Error Message"] || res.data["Note"]);
    } else {
      console.log("result", res.data);
      resolve(res.data);
    }
  });
};

export const searchSymbols = async (keywords, options) => {
  const res = await call({ function: "SYMBOL_SEARCH", keywords }, options);
  return res.bestMatches.map(match => ({
    symbol: match["1. symbol"],
    name: match["2. name"]
  }));
};
