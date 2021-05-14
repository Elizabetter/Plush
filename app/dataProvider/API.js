// eslint-disable-next-line import/no-cycle
import dataProvider from './dataProvider';
import { fetchJson } from './fetch';
import storage from '../utils/storage';

const httpClient = (url, options = {}) => {
  const token = storage.getToken();

  const user = {};
  if (token) {
    user.token = token;
  }

  return fetchJson(url, { user, ...options });
};

const { API_URL } = process.env;
const Provider = dataProvider(API_URL, httpClient);

export function create(endpoint, data) {
  return Provider.create(endpoint, { data });
}

export function createOne(endpoint, data) {
  return Provider.createOne(endpoint, { data });
}

export function deleteOne(endpoint, id, params) {
  return Provider.delete(endpoint, {
    id,
    queryParams: params,
  });
}

export function getList(endpoint, params = {}) {
  return Provider.getList(endpoint, params);
}

export function resetPassword(endpoint, params = {}) {
  return Provider.resetPassword(endpoint, params);
}

export function getOne(endpoint, id, params) {
  return Provider.getOne(endpoint, { id, ...params });
}

export function updateOne(endpoint, id, data) {
  return Provider.update(endpoint, { id, data });
}
