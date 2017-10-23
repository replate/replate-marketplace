import BaseRequester from './BaseRequester'
import APIConstants from './APIConstants'

class LoginRequester extends BaseRequester {

  static async signIn(email, password) {
    params = {
      marketplace_user: {
        email: email,
        password: password,
      }
    }

    try {
      var response_json = await BaseRequester.post(APIConstants.login.signIn, params);
      return Promise.resolve(response_json.marketplace_user)
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static changePassword(new_password) {
    // TODO (amillman): implement change password
    BaseRequester.patch(APIConstants.login.changePassword);
  }
}

export default LoginRequester;
