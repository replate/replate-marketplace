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

    success_response = (response_json) => {
      success(response_json.marketplace_user);
    }

    BaseRequester.post(APIConstants.login.signIn, params, success_response, failure);
  }

  static changePassword(new_password) {
    // TODO (amillman): implement change password
    BaseRequester.patch(APIConstants.login.changePassword);
  }
}

export default LoginRequester;
