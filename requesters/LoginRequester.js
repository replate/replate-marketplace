import BaseRequester from './BaseRequester'
import APIConstants from './APIConstants'

class LoginRequester extends BaseRequester {

  static signIn(email, password, success, failure) {
    params = {
      marketplace_user: {
        email: email,
        password: password,
      }
    }
    BaseRequester.post(APIConstants.login.signIn, params, success, failure);
  }

  static changePassword(new_password) {
    BaseRequester.patch(APIConstants.login.changePassword);
  }
}

export default LoginRequester;
