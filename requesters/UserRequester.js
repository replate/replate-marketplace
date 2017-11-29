import BaseRequester from './BaseRequester'
import APIConstants from './APIConstants'
import LocalStorage from '../helpers/LocalStorage'

class UserRequester extends BaseRequester {

  static async getCurrentUser() {
    try {
      localUser = await LocalStorage.getUser();
      currentUser = await BaseRequester.get(APIConstants.users.user(localUser.id));
      LocalStorage.storeUser(currentUser);
      return Promise.resolve(currentUser);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async updateUser(user) {
    params = {
      marketplace_user: {
        first_name: user.first_name,
        last_name: user.last_name,
        company_name: user.company_name,
        email: user.email,
        phone: user.phone,
      }
    }

    try {
      user = await BaseRequester.patch(APIConstants.users.user(user.id), params);
      LocalStorage.storeUser(user);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }

    return BaseRequester.patch(APIConstants.users.user(user.id), params);
  }
}

export default UserRequester;
