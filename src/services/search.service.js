import API from './api';

export const searchDeals = (params) => API.get('/api/search', { params });
export const getPriceHistory = (url) => API.get('/api/search/price-history', { params: { url } });
