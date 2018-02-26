import BaseRequester from './BaseRequester'
import APIConstants from './APIConstants'

import LocalStorage from '../helpers/LocalStorage'

class LoginRequester extends BaseRequester {

  static async signIn(email, password) {
    params = {
      marketplace_user: {
        email: email,
        password: password,
      }
    }

    try {
      user = await BaseRequester.post(APIConstants.login.signIn, params)
      LocalStorage.storeUser(user);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async changePassword(user_id, new_password, new_password_confirmation) {
    params = {
      marketplace_user: {
        password: new_password,
        password_confirmation: new_password_confirmation,
      }
    }

    try {
      await BaseRequester.patch(APIConstants.login.changePassword(user_id), params);
      user = await LocalStorage.getUser();
      user.has_reset_password = true;
      LocalStorage.storeUser(user);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async sendEmail(user_email) {
    params = {
      marketplace_user: {
        email: user_email,
      }
    }

    try {
      await BaseRequester.post(APIConstants.login.forgotPassword, params);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default LoginRequester;
