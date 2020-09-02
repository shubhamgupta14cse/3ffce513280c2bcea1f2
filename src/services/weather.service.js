import Constants from "../utils/Constants";
import HttpHelper from "../utils/HttpHelperUtil";

const { Routes } = Constants.URLS.apis;

function getWeather(capital) {
  return  HttpHelper.getWithParam(capital).then(({ current: { temperature, weather_icons, wind_speed, precip }, location: { name, country }}) => ({ name, country, temperature, weather_icons, wind_speed, precip }));
};


export const weatherService = {
  getWeather,
};
