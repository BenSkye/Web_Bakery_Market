import apiClient from './apiClient';

export interface Workshop {
  id: string;
  name: string;
  bakeryId: string;
  description:string
  days:  string;
  image: string[];
  time: string;
  cont
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
