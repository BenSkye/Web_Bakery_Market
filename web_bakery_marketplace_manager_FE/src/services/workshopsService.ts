import apiClient from './apiClient';

export interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

export const getWorkshops = async (): Promise<Workshop[]> => {
  try {
    const response = await apiClient.get<Workshop[]>('/workshops');
    return response.data;
  } catch (error) {
    console.error('Error fetching workshops:', error);
    throw error;
  }
};

export const getWorkshopById = async (id: string): Promise<Workshop> => {
  try {
    const response = await apiClient.get<Workshop>(`/workshops/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching workshop with id ${id}:`, error);
    throw error;
  }
};