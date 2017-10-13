class BaseRequester {

  static get(endpoint, success, failure) {
    this._request('GET', endpoint, {}, success, failure);
  }

  static post(endpoint, params, success, failure) {
    this._request('POST', endpoint, params, success, failure);
  }

  static patch(endpoint, params, success, failure) {
    this._request('PATCH', endpoint, params, success, failure);
  }

  static destroy(endpoint, success, failure) {
    this._request('DESTROY', endpoint, {}, success, failure);
  }

  static _request(method, endpoint, params, success, failure) {
    fetch(endpoint, {
      method: method,
      headers: this._getHeaders(),
      body: JSON.stringify(params)
    }).then(this._checkStatus)
      .then(success)
      .catch(failure);
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

  static _getHeaders() {
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    return headers;
  }
}

export default BaseRequester;
