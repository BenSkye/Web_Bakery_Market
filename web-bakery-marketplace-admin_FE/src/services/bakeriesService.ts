import apiClient from './apiClient';

export interface Bakery {
  id: string;
  name: string;
  address: string;
  rating: number;
  image: string;
}

export const getBakeries = async (): Promise<Bakery[]> => {
  try {
    const response = await apiClient.get<Bakery[]>('/bakeries');
    return response.data;
  } catch (error) {
    console.error('Error fetching bakeries:', error);
    throw error;
  }
};

export const getBakeryById = async (id: string): Promise<Bakery> => {
  try {
    const response = await apiClient.get<Bakery>(`/bakeries/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bakery with id ${id}:`, error);
    throw error;
  }
};
