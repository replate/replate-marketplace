import LocalStorage from '../helpers/LocalStorage';
import queryString from 'query-string'

class BaseRequester {

  static get(endpoint, params={}) {
    return this._request('GET', endpoint, params);
  }

  static post(endpoint, params) {
    return this._request('POST', endpoint, params);
  }

  static patch(endpoint, params) {
    return this._request('PATCH', endpoint, params);
  }

  static destroy(endpoint) {
    return this._request('DESTROY', endpoint);
  }

  static async _request(method, endpoint, params={}) {
    var headers = await this._getHeaders();
    var requestBody = JSON.stringify(params);

    if (method === 'GET') {
      requestBody = undefined;

      if (Object.keys(params).length > 0) {
        endpoint += `/?${queryString.stringify(params)}`;
      }
    }

    return fetch(endpoint, {
      method: method,
      headers: headers,
      body: requestBody
    }).then(this._checkStatus);
  }

  static _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      let error = new Error(response.statusText);
      throw error;
    }
  }

  static async _getHeaders(callback) {
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    try {
      user = await LocalStorage.getUser();
      headers.X_AUTH_EMAIL = user.email;
      headers.X_AUTH_TOKEN = user.authentication_token;
    } catch (error) {}
    return Promise.resolve(headers);
  }
}

export default BaseRequester;
