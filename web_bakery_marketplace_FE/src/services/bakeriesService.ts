import apiClient from './apiClient';

export interface Bakery {
  id: string;
  _id: string;
  name: string;
  address: string;
  rating: number;
  image: string;

}

export const getBakeries = async () => {
  try {
    console.log(apiClient.defaults.headers)
    const response = await apiClient.get('/bakery/get-list');

    return response.data;
  } catch (error) {
    console.error('Error fetching bakeries:', error);
    throw error;
  }
};

export const getBakeryById = async (id: string) => {
  try {
    const response = await apiClient.get<Bakery>(`/bakery/get-by-id/${id}`);
    return response.data;

  } catch (error) {
    console.error(`Error fetching bakery with id ${id}:`, error);
    throw error;
  }
};
