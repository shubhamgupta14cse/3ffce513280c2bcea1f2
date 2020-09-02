import axios from "axios";
import AsyncStorage  from "@react-native-community/async-storage";

import Constants from './Constants';
const { apis } = Constants.URLS;

import Toast from "./Toast";

function getSessAuthHeader() {
  // return 'Bearer _exampleToken'
}

function handleResponse(response) {
  const { status, data } = response;
  if (status === 200) Toast.success("Sucessfull got the country data");
  return data;
};

async function handleError(error) {
  // console.log()
  // return Promise.reject(error.response?.data?.errors[0]);
}

const countryInstance = axios.create({
  baseURL: apis.REST_COUNTRIES_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const weatherInstance = axios.create({
  baseURL: `http://api.weatherstack.com/`,
  headers: {
    "Content-Type": "application/json",
  },
});


const HttpHelperUtil = {
  get: function (url) {
    return countryInstance
      .get(`${url}`)
      .then(handleResponse)
      .catch(handleError);
  },
  getWithParam: function (query) {
    return weatherInstance
      .get(`current?access_key=d8df1864d22d35d61ede9df9c1d3ab5e&query=${query}`)
      .then(handleResponse)
      .catch(handleError);
  },
};

module.exports = HttpHelperUtil;
