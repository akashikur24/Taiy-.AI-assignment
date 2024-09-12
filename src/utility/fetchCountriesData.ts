import axios from "axios";
//api for the countries cases
export const fetchCountriesData = async () => {
  const { data } = await axios.get("https://disease.sh/v3/covid-19/countries");
  return data;
};
