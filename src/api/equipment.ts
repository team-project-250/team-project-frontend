export interface EquipmentApiItem {
  id: number;
  name: string;
  slug: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  price_per_day: string;
  rating: string;
  main_image: string | null;
  is_popular: boolean;
  availability: {
    status: string;
    available_from: string | null;
  };
}

export interface EquipmentDetailsApiItem extends EquipmentApiItem {
  model: string | null;
  sku: string;
  short_description: string;
  description: string;
  badges: {
    label: string;
  }[];
  images: {
    id: number;
    image: string;
    order: number;
  }[];
  specs: {
    label: string;
    value: string;
  }[];
  included_items: {
    name: string;
  }[];
  benefits: {
    text: string;
  }[];
  suitable_for: {
    text: string;
  }[];
  available_cities: string[];
  breadcrumbs: {
    label: string;
    url: string | null;
  }[];
}

interface EquipmentApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: EquipmentApiItem[];
}

const API_URL = import.meta.env.VITE_API_URL;

export const getEquipment = async (citySlug: string): Promise<EquipmentApiItem[]> => {
  const response = await fetch(`${API_URL}/equipment/?city=${citySlug}`);

  if (!response.ok) {
    throw new Error('Не вдалося завантажити обладнання');
  }

  const data: EquipmentApiResponse = await response.json();

  return data.results;
};

export const getEquipmentDetails = async (
  slug: string,
): Promise<EquipmentDetailsApiItem> => {
  const response = await fetch(`${API_URL}/equipment/${slug}/`);

  if (!response.ok) {
    throw new Error('Не вдалося завантажити обладнання');
  }

  return response.json();
};

export const getRelatedEquipment = async (slug: string): Promise<EquipmentApiItem[]> => {
  const response = await fetch(`${API_URL}/equipment/${slug}/related/`);

  if (!response.ok) {
    throw new Error('Не вдалося завантажити схоже обладнання');
  }

  return response.json();
};
