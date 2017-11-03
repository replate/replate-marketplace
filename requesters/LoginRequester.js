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

    return BaseRequester.post(APIConstants.login.signIn, params);
  }

  static changePassword(new_password) {
    // TODO (amillman): implement change password
    BaseRequester.patch(APIConstants.login.changePassword);
  }
}

export default LoginRequester;
