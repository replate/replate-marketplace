class BaseRequester {

  get = (endpoint, success, failure) => {
    this._request('GET', {}, success, failure);
  }

  post = (endpoint, params, success, failure) => {
    this._request('POST', params, success, failure);
  }

  patch = (endpoint, params, success, failure) => {
    this._request('PATCH', params, success, failure);
  }

  _request = (method, endpoint, params, success, failure) => {
    fetch(endpoint, {
      method: method,
      headers: this._getHeaders(),
      body: JSON.stringify(params)
    }).then(this._checkStatus)
      .then((response) => success(response.json()))
      .catch((error) => failure(error));
  }

  _checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  _getHeaders = () => {
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    return headers;
  }
}

export default BaseRequester;
