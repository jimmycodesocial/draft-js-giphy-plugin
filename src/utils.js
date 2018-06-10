import GphApiClient from 'giphy-js-sdk-core';

/**
 * Translate text to GIF.
 * @see https://developers.giphy.com/docs/#operation--gifs-translate-get
 * @param {*} apiKey Your Application Key.
 * @param {*} text   Text to translate.
 * @param {*} params Include query params in the request.
 */
export const translateTextToGif = (apiKey, text, params = {}) => {
  return GphApiClient(apiKey).translate('gifs', { ...params, s: text });
};

/**
 * Search for GIFs.
 * @see https://developers.giphy.com/docs/#operation--gifs-search-get
 * @param {*} apiKey Your Application Key.
 * @param {*} text   Text to search.
 * @param {*} page   Pagination page.
 * @param {*} limit  Pagination limit.
 * @param {*} params Include query params in the request.
 */
export const searchGifs = (apiKey, text, page = 1, limit = 9, params = {}) => {
  const offset = (page - 1) * limit;

  return GphApiClient(apiKey).search('gifs', { ...params, limit, offset, q: text });
};

/**
 * Load trending GIFs.
 * @see https://developers.giphy.com/docs/#operation--gifs-trending-get
 * @param {*} apiKey Your Application Key.
 * @param {*} page   Pagination page.
 * @param {*} limit  Pagination limit.
 * @param {*} params Include query params in the request.
 */
export const trendingGifs = (apiKey, page = 1, limit = 9, params = {}) => {
  const offset = (page - 1) * limit;

  return GphApiClient(apiKey).trending('gifs', { ...params, limit, offset });
};
