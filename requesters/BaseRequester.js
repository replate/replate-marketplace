import LocalStorage from '../helpers/LocalStorage';

class BaseRequester {

  static get(endpoint) {
    return this._request('GET', endpoint, {});
  }

  static post(endpoint, params) {
    return this._request('POST', endpoint, params);
  }

  static patch(endpoint, params) {
    return this._request('PATCH', endpoint, params);
  }

  static destroy(endpoint) {
    return this._request('DESTROY', endpoint, {});
  }

  static async _request(method, endpoint, params, success, failure) {
    var headers = await this._getHeaders();
    return fetch(endpoint, {
      method: method,
      headers: headers,
      body: JSON.stringify(params)
    }).then(this._checkStatus);
  }

  static _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      let error = new Error(response.statusText);
      error.response = response;
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
