import superagent from 'superagent';
import mockSuperagent from './superagent.mock';

require('superagent-mock')(superagent, mockSuperagent);

const methods = ['get', 'post', 'put', 'del', 'patch'];

export function formatUrl(path) {
  return `http://test${path}`;
}

export default class ApiClient {
  constructor() {
    methods.forEach((method) => {
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {

        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => {
          if (err) { /* ignore coverage */
            reject(body || err);
          } else if (body && body.error) {
            reject(body.error);
          } else {
            resolve(body);
          }
        });
      });
    });
  }
}
