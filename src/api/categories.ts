export interface CategoryApiItem {
  id: number;
  name: string;
  slug: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export const getCategories = async (): Promise<CategoryApiItem[]> => {
  const response = await fetch(`${API_URL}/categories/`);

  if (!response.ok) {
    throw new Error('Не вдалося завантажити категорії');
  }

  return response.json();
};
