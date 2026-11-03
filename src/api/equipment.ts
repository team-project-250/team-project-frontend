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

export interface EquipmentApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: EquipmentApiItem[];
}

export interface EquipmentQueryParams {
  city: string;
  category?: string[];
  availability?: 'available' | 'booked';
  ordering?: 'rating' | '-rating' | 'price_per_day' | '-price_per_day' | 'name';
  page?: number;
  page_size?: number;
  is_popular?: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

export const getEquipment = async (
  params: EquipmentQueryParams,
): Promise<EquipmentApiResponse> => {
  const searchParams = new URLSearchParams();

  searchParams.set('city', params.city);

  if (params.category?.length) {
    searchParams.set('category', params.category.join(','));
  }

  if (params.availability) {
    searchParams.set('availability', params.availability);
  }

  if (params.ordering) {
    searchParams.set('ordering', params.ordering);
  }

  if (params.page) {
    searchParams.set('page', String(params.page));
  }

  if (params.page_size) {
    searchParams.set('page_size', String(params.page_size));
  }

  if (params.is_popular) {
    searchParams.set('is_popular', 'true');
  }

  const response = await fetch(`${API_URL}/equipment/?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Не вдалося завантажити обладнання');
  }
  return response.json();
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
