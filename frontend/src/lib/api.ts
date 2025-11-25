const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface FetchOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

// Services API
export const servicesApi = {
  getAll: (lang: string = 'no') => fetchApi<any[]>(`/services?lang=${lang}`),
  getByCategory: (category: string, lang: string = 'no') =>
    fetchApi<any[]>(`/services/category/${category}?lang=${lang}`),
  getBySlug: (slug: string, lang: string = 'no') =>
    fetchApi<any>(`/services/${slug}?lang=${lang}`),
  getCategories: () => fetchApi<any[]>('/services/categories'),
};

// Packages API
export const packagesApi = {
  getAll: (lang: string = 'no') => fetchApi<any[]>(`/packages?lang=${lang}`),
  getBySlug: (slug: string, lang: string = 'no') =>
    fetchApi<any>(`/packages/${slug}?lang=${lang}`),
};

// Testimonials API
export const testimonialsApi = {
  getAll: (lang: string = 'no') => fetchApi<any[]>(`/testimonials?lang=${lang}`),
  getFeatured: (lang: string = 'no', limit: number = 3) =>
    fetchApi<any[]>(`/testimonials/featured?lang=${lang}&limit=${limit}`),
};

// Blog API
export const blogApi = {
  getPosts: (lang: string = 'no', page: number = 1, limit: number = 10) =>
    fetchApi<any>(`/blog/posts?lang=${lang}&page=${page}&limit=${limit}`),
  getPostBySlug: (slug: string, lang: string = 'no') =>
    fetchApi<any>(`/blog/posts/${slug}?lang=${lang}`),
  getRecentPosts: (lang: string = 'no', limit: number = 3) =>
    fetchApi<any[]>(`/blog/posts/recent?lang=${lang}&limit=${limit}`),
  getTags: (lang: string = 'no') => fetchApi<any[]>(`/blog/tags?lang=${lang}`),
};

// Inquiries API
export const inquiriesApi = {
  create: (data: any) => fetchApi<any>('/inquiries', { method: 'POST', body: data }),
};

// Settings API
export const settingsApi = {
  getAll: (lang: string = 'no') => fetchApi<Record<string, string>>(`/settings?lang=${lang}`),
};
