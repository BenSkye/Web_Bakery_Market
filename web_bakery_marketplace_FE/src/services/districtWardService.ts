import axios from "axios";


export const fetchDataEsgoo = async (url: any) => {
  try {
    const response = await axios.get(url);
    if (response.data.error === 0) {
      return response.data.data;
    } else {
      console.error("Error fetching data:", response.data.error_text);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  return [];
};

export const fetchDistricts = (provinceId: any) => {
  return fetchDataEsgoo(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
};

export const fetchWards = (districtId: any) => {
  return fetchDataEsgoo(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
};