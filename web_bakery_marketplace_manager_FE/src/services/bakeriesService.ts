import apiClient from './apiClient';
export interface Contact {
  phone: string;
  facebook?: string;
  instagram?: string;
}

export interface Bakery {
  id: string;
  _id: string;
  name: string;
  address: string;
  contact: Contact;
  rating: number;
  image: string[];
  status: string;
}

export const getBakeries = async () => {
  try {
    const response = await apiClient.get('/bakery/get-list');

    return response.data;
  } catch (error) {
    console.error('Error fetching bakeries:', error);
    throw error;
  }
};

export const getBakeryById = async (id: string) => {
  try {
    const response = await apiClient.get<Bakery>(`bakery/get-by-user-id/${id}`);
    return response.data;

  } catch (error) {
    console.error(`Error fetching bakery with id ${id}:`, error);
    throw error;
  }
};

export const getBakeryByUserId = async (userId: string) => {
  try {
    const response = await apiClient.get(`bakery/get-by-user-id/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bakery with user id ${userId}:`, error);
    throw error;
  }
};

export const createBakery = async (data: any) => {
  try {
    const response = await apiClient.post('/bakery/create', data);
    return response; // Return the entire response, not just response.data
  } catch (error) {
    console.error('Error creating bakery:', error);
    throw error; // Ensure that the error is propagated for handling
  }
};

