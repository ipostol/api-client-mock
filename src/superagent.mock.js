import expect from 'expect';

class Response {

  responses = {};

  /**
   * register request by url, responce and method
   */
  register(url, method, response) {
    this.responses[url] = (body, headers) => {
      return {
        payload: response(body, headers),
        method
      };
    };
  }

  clear() {
    this.responses = {};
  }

}

const response = new Response();

export { response };

// about this config - https://github.com/M6Web/superagent-mock/blob/master/README.md

export default [{

  pattern: 'http://test(.*)',

  fixtures(match, body, headers) {

    if (!response.responses[match[1]]) {
      console.error('not found url !!!!!!', match[1]);
      throw new Error(404);
    }

    return response.responses[match[1]](body, headers);

  },

  get(match, { payload, method }) {
    expect(method).toBe('get');
    return {
      body: payload
    };
  },

  post(match, { payload, method }) {
    expect(method).toBe('post');
    return {
      body: payload
    };
  },

  put(match, { payload, method }) {
    expect(method).toBe('put');
    return {
      body: payload
    };
  },

  delete(match, { payload, method }) {
    expect(method).toBe('del');
    return {
      body: payload
    };
  },

  patch(match, { payload, method }) {
    expect(method).toBe('patch');
    return {
      body: payload
    };
  }

}];
