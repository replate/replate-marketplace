import BaseRequester from './BaseRequester'
import APIConstants from './APIConstants'
import LocalStorage from '../helpers/LocalStorage'

class ProfileRequester extends BaseRequester {

  static async getCurrentUser() {
    try {
      user = await LocalStorage.getUser();
      return BaseRequester.get(APIConstants.profile.user(user.id));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ProfileRequester;
