import API from './api';

export const saveSearch = (data) => API.post('/api/user/save-search', data);
export const getSavedSearches = () => API.get('/api/user/saved-searches');
export const deleteSavedSearch = (id) => API.delete(`/api/user/saved-searches/${id}`);

export const addBookmark = (data) => API.post('/api/user/bookmark', data);
export const getBookmarks = () => API.get('/api/user/bookmarks');
export const deleteBookmark = (id) => API.delete(`/api/user/bookmarks/${id}`);

export const setPriceAlert = (data) => API.post('/api/price-alert', data);
export const getPriceAlerts = () => API.get('/api/price-alert');
