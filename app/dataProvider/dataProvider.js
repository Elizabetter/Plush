/* eslint-disable no-unused-vars */
import { stringify } from 'query-string';
import { isEmpty } from 'lodash';
import { fetchJson, flattenObject } from './fetch';
import { formatResponseToEntity, formatResponseToList } from './routineUtils';

/**
 * Maps queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 *
 * @example
 *
 * getList          => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * getOne           => GET http://my.api.url/posts/123
 * getManyReference => GET http://my.api.url/posts?author_id=345
 * getMany          => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * create           => POST http://my.api.url/posts/123
 * update           => PUT http://my.api.url/posts/123
 * updateMany       => PUT http://my.api.url/posts/123, PUT http://my.api.url/posts/456, PUT http://my.api.url/posts/789
 * delete           => DELETE http://my.api.url/posts/123
 *
 */
export default (apiUrl, httpClient = fetchJson) => ({
  // getList: (resource, params) => {
  //   // const { page, perPage} = params.pagination;
  //   // const { field, order } = params.sort;
  //   const query = {
  //     // ...flattenObject(params.filter),
  //     // _sort: field,
  //     // _order: order,
  //     // _start: (page - 1) * perPage,
  //     // _end: page * perPage,
  //   };
  //   const url = `${apiUrl}/${resource}?${stringify(query)}`;
  //   // eslint-disable-next-line arrow-body-style
  //   return httpClient(url).then(({ headers, json }) => {
  //     // if (!headers.has('x-total-count')) {
  //     //   throw new Error(
  //     //     'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?',
  //     //   );
  //     // }
  //     return formatResponseToList(json);
  //   });
  // },
  getList: (resource, params) => {
    let query = {};
    console.log(params);
    if (params?.params) {
      const { limit, page, ...otherParams } = params?.params;

      query = flattenObject({ ...otherParams });
      console.log(query);
      if (page && page !== 'undefined') {
        // @TODO remove -1 when API pagination will be changed
        query.page = page - 1;
      }
      if (limit && limit !== 'undefined') {
        query.size = limit;
      }
    }

    let url = `${apiUrl}/${resource}`;
    if (!isEmpty(query)) {
      url += `?${stringify(query, { skipNull: true })}`;
    }
    // eslint-disable-next-line arrow-body-style
    return httpClient(url).then(({ headers, json }) => {
      // if (!headers.has('x-total-count')) {
      //   throw new Error(
      //     'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?',
      //   );
      // }
      return formatResponseToList(json);
    });
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) =>
      formatResponseToEntity(json),
    ),

  resetPassword: (resource, params) =>
    httpClient(`${apiUrl}/${resource}?email=${params.login}`).then(({ json }) =>
      formatResponseToEntity(json),
    ),

  getMany: (resource, params) => {
    const query = {
      id: params.ids,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => formatResponseToEntity(json));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...flattenObject(params.filter),
      [params.target]: params.id,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      if (!headers.has('x-total-count')) {
        throw new Error(
          'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?',
        );
      }
      return {
        data: json,
        total: parseInt(
          headers
            .get('x-total-count')
            .split('/')
            .pop(),
          10,
        ),
      };
    });
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => formatResponseToEntity(json)),

  // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map(id =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        }),
      ),
    ).then(responses => ({ data: responses.map(({ json }) => json.id) })),

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => formatResponseToEntity(json)),

  createOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(json => json),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => formatResponseToEntity(json)),

  // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map(id =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'DELETE',
        }),
      ),
    ).then(responses => ({ data: responses.map(({ json }) => json.id) })),
});
