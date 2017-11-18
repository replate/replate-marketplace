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

  static async changePassword(user_id, new_password, new_password_confirmation) {
    params = {
      marketplace_user: {
        password: new_password,
        password_confirmation: new_password_confirmation,
      }
    }
    return BaseRequester.patch(APIConstants.login.changePassword(user_id), params);
  }
}

export default LoginRequester;
